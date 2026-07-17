package com.cesartravel.booking.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.cesartravel.booking.client.AuthServiceClient;
import com.cesartravel.booking.client.NotificationClient;
import com.cesartravel.booking.client.PropertyServiceClient;
import com.cesartravel.booking.client.PropertyView;
import com.cesartravel.booking.dto.BookingRequest;
import com.cesartravel.booking.exception.DateRangeUnavailableException;
import com.cesartravel.booking.exception.InvalidDateRangeException;
import com.cesartravel.booking.exception.NotReservationOwnerException;
import com.cesartravel.booking.exception.PropertyNotFoundException;
import com.cesartravel.booking.model.Reservation;
import com.cesartravel.booking.repository.ReservationRepository;
import com.cesartravel.booking.security.AuthenticatedUser;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private PropertyServiceClient propertyServiceClient;

    @Mock
    private AuthServiceClient authServiceClient;

    @Mock
    private NotificationClient notificationClient;

    private BookingService bookingService;

    private final AuthenticatedUser guest = new AuthenticatedUser(2L, "sofia@example.com", "Sofía", "Gómez", "USER");
    private final AuthenticatedUser owner =
            new AuthenticatedUser(1L, "admin@cesartravel.co", "Admin", "CesarTravel", "ADMIN");

    @BeforeEach
    void setUp() {
        bookingService =
                new BookingService(reservationRepository, propertyServiceClient, authServiceClient, notificationClient);
    }

    @Test
    void rejectsACheckOutThatIsNotAfterCheckIn() {
        BookingRequest request = new BookingRequest(6L, LocalDate.now().plusDays(5), LocalDate.now().plusDays(5));

        assertThatThrownBy(() -> bookingService.create(request, guest))
                .isInstanceOf(InvalidDateRangeException.class);
    }

    @Test
    void rejectsABookingForAPropertyThatDoesNotExist() {
        BookingRequest request = new BookingRequest(999L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));
        when(propertyServiceClient.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.create(request, guest))
                .isInstanceOf(PropertyNotFoundException.class);
    }

    @Test
    void createsAReservationOwnedByTheAuthenticatedGuest() {
        BookingRequest request = new BookingRequest(6L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));
        when(propertyServiceClient.findById(6L)).thenReturn(Optional.of(new PropertyView(6L, 1L, "Casa en Cartagena")));
        when(reservationRepository.findOverlapping(6L, request.checkIn(), request.checkOut())).thenReturn(List.of());
        when(reservationRepository.save(any())).thenAnswer(invocation -> {
            Reservation reservation = invocation.getArgument(0);
            reservation.setId(10L);
            return reservation;
        });

        var response = bookingService.create(request, guest);

        assertThat(response.id()).isEqualTo(10L);
        assertThat(response.productId()).isEqualTo(6L);
        assertThat(response.userId()).isEqualTo(2L);
    }

    @Test
    void rejectsABookingThatOverlapsAnExistingReservation() {
        BookingRequest request = new BookingRequest(6L, LocalDate.now().plusDays(5), LocalDate.now().plusDays(8));
        when(propertyServiceClient.findById(6L)).thenReturn(Optional.of(new PropertyView(6L, 1L, "Casa en Cartagena")));

        Reservation existing = new Reservation();
        existing.setId(1L);
        existing.setProductId(6L);
        existing.setUserId(99L);
        existing.setCheckIn(LocalDate.now().plusDays(6));
        existing.setCheckOut(LocalDate.now().plusDays(10));
        when(reservationRepository.findOverlapping(6L, request.checkIn(), request.checkOut()))
                .thenReturn(List.of(existing));

        assertThatThrownBy(() -> bookingService.create(request, guest))
                .isInstanceOf(DateRangeUnavailableException.class);
    }

    @Test
    void onlyThePropertyOwnerCanSeeItsOccupants() {
        when(propertyServiceClient.findById(6L)).thenReturn(Optional.of(new PropertyView(6L, 1L, "Casa en Cartagena")));

        assertThatThrownBy(() -> bookingService.findByProperty(6L, guest))
                .isInstanceOf(NotReservationOwnerException.class);
    }

    @Test
    void anAdminCanSeeOccupantsWithoutOwningTheProperty() {
        when(reservationRepository.findByProductId(6L)).thenReturn(List.of());

        var result = bookingService.findByProperty(6L, owner);

        assertThat(result).isEmpty();
    }
}
