package com.cesartravel.booking.service;

import com.cesartravel.booking.client.AuthServiceClient;
import com.cesartravel.booking.client.NotificationClient;
import com.cesartravel.booking.client.PropertyServiceClient;
import com.cesartravel.booking.client.PropertyView;
import com.cesartravel.booking.client.UserView;
import com.cesartravel.booking.dto.AvailabilityResponse;
import com.cesartravel.booking.dto.BookingRequest;
import com.cesartravel.booking.dto.BookingResponse;
import com.cesartravel.booking.exception.DateRangeUnavailableException;
import com.cesartravel.booking.exception.InvalidDateRangeException;
import com.cesartravel.booking.exception.NotReservationOwnerException;
import com.cesartravel.booking.exception.PropertyNotFoundException;
import com.cesartravel.booking.exception.ReservationNotFoundException;
import com.cesartravel.booking.model.Reservation;
import com.cesartravel.booking.repository.ReservationRepository;
import com.cesartravel.booking.security.AuthenticatedUser;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {

    private final ReservationRepository reservationRepository;
    private final PropertyServiceClient propertyServiceClient;
    private final AuthServiceClient authServiceClient;
    private final NotificationClient notificationClient;

    public BookingService(
            ReservationRepository reservationRepository,
            PropertyServiceClient propertyServiceClient,
            AuthServiceClient authServiceClient,
            NotificationClient notificationClient) {
        this.reservationRepository = reservationRepository;
        this.propertyServiceClient = propertyServiceClient;
        this.authServiceClient = authServiceClient;
        this.notificationClient = notificationClient;
    }

    @Transactional
    public BookingResponse create(BookingRequest request, AuthenticatedUser guest) {
        if (!request.checkOut().isAfter(request.checkIn())) {
            throw new InvalidDateRangeException("checkOut debe ser posterior a checkIn");
        }

        PropertyView property = propertyServiceClient
                .findById(request.productId())
                .orElseThrow(() -> new PropertyNotFoundException(request.productId()));

        // No es a prueba de condiciones de carrera (dos requests concurrentes para las mismas
        // fechas podrían pasar esta validación antes de que cualquiera de las dos haga commit);
        // cubre el caso común. Un lock pesimista o una constraint a nivel de base queda para
        // cuando el volumen de reservas simultáneas lo justifique.
        boolean hasOverlap = !reservationRepository
                .findOverlapping(property.id(), request.checkIn(), request.checkOut())
                .isEmpty();
        if (hasOverlap) {
            throw new DateRangeUnavailableException();
        }

        Reservation reservation = new Reservation();
        reservation.setProductId(property.id());
        reservation.setUserId(guest.id());
        reservation.setCheckIn(request.checkIn());
        reservation.setCheckOut(request.checkOut());

        Reservation saved = reservationRepository.save(reservation);
        notifyBookingConfirmation(saved, property, guest);
        return BookingResponse.from(saved);
    }

    /** Emails de confirmación al huésped y al dueño — best-effort (ADR-0002): cualquier fallo
     * se loguea dentro de los clientes y jamás revierte la reserva. El email del dueño se
     * resuelve reenviando el JWT del huésped a auth-service (viaja como credentials, ver
     * JwtAuthenticationFilter); el del huésped ya viene en el propio token. */
    private void notifyBookingConfirmation(Reservation reservation, PropertyView property, AuthenticatedUser guest) {
        try {
            String token = String.valueOf(SecurityContextHolder.getContext().getAuthentication().getCredentials());
            UserView propertyOwner = property.ownerId() == null
                    ? null
                    : authServiceClient.findById(property.ownerId(), token).orElse(null);

            notificationClient.sendBookingConfirmation(new NotificationClient.BookingConfirmationPayload(
                    reservation.getId(),
                    property.title(),
                    reservation.getCheckIn(),
                    reservation.getCheckOut(),
                    (guest.name() + " " + guest.lastname()).trim(),
                    guest.email(),
                    propertyOwner == null ? null : propertyOwner.name(),
                    propertyOwner == null ? null : propertyOwner.email()));
        } catch (Exception ex) {
            // Cinturón y tiradores: los clientes ya capturan sus errores, pero nada de lo que
            // pase acá (p.ej. SecurityContext vacío en un test) puede voltear la reserva creada.
        }
    }

    public List<BookingResponse> findMine(AuthenticatedUser guest) {
        return reservationRepository.findByUserId(guest.id()).stream().map(BookingResponse::from).toList();
    }

    /** Ocupantes de un inmueble — solo el dueño de ese inmueble (confirmado contra
     * property-service) o un ADMIN puede consultarlos (ver ADR-0004). */
    public List<BookingResponse> findByProperty(Long productId, AuthenticatedUser requester) {
        if (!requester.isAdmin()) {
            PropertyView property = propertyServiceClient
                    .findById(productId)
                    .orElseThrow(() -> new PropertyNotFoundException(productId));
            if (!requester.id().equals(property.ownerId())) {
                throw new NotReservationOwnerException();
            }
        }
        return reservationRepository.findByProductId(productId).stream().map(BookingResponse::from).toList();
    }

    /** Fechas ya ocupadas de un inmueble, sin identidad del huésped — pública, para que
     * cualquiera pueda deshabilitarlas en el calendario al mirar una propiedad (a diferencia
     * de findByProperty, que sí identifica al huésped y es solo para el dueño). */
    public List<AvailabilityResponse> findAvailability(Long productId) {
        return reservationRepository.findByProductId(productId).stream()
                .map(AvailabilityResponse::from)
                .toList();
    }

    /** Inmuebles ocupados (con reserva solapada) en un rango — pública como availability: solo
     * ids, sin identidad. El buscador del frontend los excluye de los resultados. */
    public List<Long> findUnavailableProducts(java.time.LocalDate from, java.time.LocalDate to) {
        if (!to.isAfter(from)) {
            throw new InvalidDateRangeException("to debe ser posterior a from");
        }
        return reservationRepository.findUnavailableProductIds(from, to);
    }

    @Transactional
    public void cancel(Long id, AuthenticatedUser requester) {
        Reservation reservation =
                reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));

        boolean isGuest = reservation.getUserId().equals(requester.id());
        if (!isGuest && !requester.isAdmin()) {
            throw new NotReservationOwnerException();
        }
        reservationRepository.delete(reservation);
    }
}
