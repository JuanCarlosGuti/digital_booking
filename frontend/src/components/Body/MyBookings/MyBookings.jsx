import React from "react";
import "./MyBookings.scss";
import "./../ProductList/ProductListStyle.scss";
import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";

import ProductHeader from "../Product/ProductHeader";
import { BiBuildingHouse } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { getAllBookings } from "../../../services/fetchService";

export default function Booking() {
  const [ready, setReady] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { userId } = useParams();

  // useEffect() -- obtener reservas
  useEffect(() => {
    if (!ready) {
      getAllBookings().then((response) => {
        //console.log(typeof(userId));
        //console.log(response.filter((b) => b.user.id == userId));
        setBookings(response.filter((b) => b.user.id == userId));
        setReady(true);
      });
    }
  }, []);

  if (!ready) {
    return (
      <div className="productListMainContainer">
        <ProductHeader
          product={{ name: "Mis Reservas" }}
          category={{ title: "" }}
        />
        <div className="emptyBooking">
          <h4>Cargando las reservas...</h4>
        </div>
      </div>
    );
  } else if (bookings.length === 0) {
    return (
      <div className="productListMainContainer">
        <ProductHeader
          product={{ name: "Mis Reservas" }}
          category={{ title: "" }}
        />
        <div className="emptyBooking">
          <BiBuildingHouse />

          <h4>Aún no has efectuado ninguna reserva</h4>
          <Link to="/home">Buscar propiedades</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="productListMainContainer_booking">
        <ProductHeader
          product={{ name: "Mis Reservas" }}
          category={{ title: "" }}
        />
        <div className="productListMainContainer__productList">
          {bookings.map((booking, i) => (
            <BookingCard
              key={booking.id}
              id={i + 1}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              name={booking.product.name}
              title={booking.product.title}
              category={booking.product.category.title}
              image={
                booking.product.images.length > 0
                  ? booking.product.images[0].url
                  : ""
              }
              location={booking.product.address}
              description={booking.product.description}
              city={booking.product.city}
            />
          ))}
          {/* {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              product={booking.product}
              // title={booking.product.title}
              category={booking.product.category}
              // image={imagesBucketUrl + booking.product.category.imageUrl}
              // location={booking.product.address}
              // description={booking.product.description}
              // city={booking.product.city}
            />
          ))} */}
        </div>
      </div>
    );
  }
}
