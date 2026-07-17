package com.cesartravel.booking.controller;

import com.cesartravel.booking.dto.AvailabilityResponse;
import com.cesartravel.booking.dto.BookingRequest;
import com.cesartravel.booking.dto.BookingResponse;
import com.cesartravel.booking.security.AuthenticatedUser;
import com.cesartravel.booking.service.BookingService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponse> create(
            @Valid @RequestBody BookingRequest request, @AuthenticationPrincipal AuthenticatedUser guest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.create(request, guest));
    }

    @GetMapping("/mine")
    public List<BookingResponse> findMine(@AuthenticationPrincipal AuthenticatedUser guest) {
        return bookingService.findMine(guest);
    }

    /** Ocupantes de un inmueble — para que el propietario vea quién lo reservó y cuándo. */
    @GetMapping("/property/{productId}")
    public List<BookingResponse> findByProperty(
            @PathVariable Long productId, @AuthenticationPrincipal AuthenticatedUser requester) {
        return bookingService.findByProperty(productId, requester);
    }

    /** Fechas ocupadas de un inmueble, sin identidad del huésped — pública (ver SecurityConfig),
     * para deshabilitarlas en el calendario del detalle de la propiedad. */
    @GetMapping("/availability/{productId}")
    public List<AvailabilityResponse> findAvailability(@PathVariable Long productId) {
        return bookingService.findAvailability(productId);
    }

    /** Ids de inmuebles ocupados en el rango — pública, para la búsqueda por fechas. */
    @GetMapping("/unavailable")
    public List<Long> findUnavailable(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return bookingService.findUnavailableProducts(from, to);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser requester) {
        bookingService.cancel(id, requester);
        return ResponseEntity.noContent().build();
    }
}
