import React from "react";
import "./MyBookings.scss";
import "./../ProductList/ProductListStyle.scss";
import { useState, useEffect, useCallback } from "react";
import BookingCard from "./BookingCard";

import ProductHeader from "../Product/ProductHeader";
import { BiBuildingHouse } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getMyBookings, getProduct, cancelBooking, getMyReviews } from "../../../services/fetchService";

export default function MyBookings() {
  const [bookings, setBookings] = useState(null);
  const [reviewedProductIds, setReviewedProductIds] = useState([]);

  const loadBookings = useCallback(() => {
    getMyBookings().then(async (myBookings) => {
      const withProduct = await Promise.all(
        myBookings.map(async (booking) => ({ ...booking, product: await getProduct(booking.productId) }))
      );
      setBookings(withProduct);
    });
    getMyReviews()
      .then(setReviewedProductIds)
      .catch(() => setReviewedProductIds([]));
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleCancel = async (bookingId) => {
    await cancelBooking(bookingId).catch(() => {});
    loadBookings();
  };

  if (bookings === null) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mis Reservas" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <h4>Cargando las reservas...</h4>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mis Reservas" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <BiBuildingHouse />
          <h4>Aún no has efectuado ninguna reserva</h4>
          <Link to="/home">Buscar propiedades</Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="productListMainContainer_booking">
      <ProductHeader product={{ title: "Mis Reservas" }} category={{ title: "" }} />
      <div className="productListMainContainer__productList">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            id={booking.id}
            productId={booking.productId}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            title={booking.product.title}
            category={booking.product.category.title}
            image={booking.product.images.length > 0 ? booking.product.images[0].url : ""}
            location={booking.product.address}
            city={booking.product.city}
            onCancel={() => handleCancel(booking.id)}
            // Reseñar: solo estadías finalizadas (fechas yyyy-MM-dd comparan bien como string)
            // y sin reseña previa en esa propiedad.
            canReview={booking.checkOut <= today && !reviewedProductIds.includes(booking.productId)}
            onReviewSubmitted={loadBookings}
          />
        ))}
      </div>
    </div>
  );
}
