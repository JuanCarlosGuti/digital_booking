import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import ProductHeader from "../Product/ProductHeader";
import ProductPolicy from "../Product/ProductPolicy";
import { getProduct } from "../../../services/fetchService";

import "./Booking.scss";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingCalendar from "./BookingCalendar";
import BookingTime from "./BookingTime";

export default function Booking() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bookingHour, setBookinHour] = useState("");

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) {
    return <h2>Cargando ...</h2>;
  }

  const policy1 = (product.extraDescription1 || "").split(",").filter(Boolean);
  const policy2 = (product.extraDescription2 || "").split(",").filter(Boolean);
  const policy3 = product.extraDescription3 || "";

  return (
    <div className="booking">
      <ProductHeader product={product} city={product.city} category={product.category} />

      <div className="booking__container">
        <div className="displayDesktop">
          <div className="formAndCalendar">
            <BookingForm city={product.city} />
            <BookingCalendar productId={product.id} setStartDate={setStartDate} setEndDate={setEndDate} />
            <BookingTime setBookinHour={setBookinHour} />
          </div>
          <div className="details">
            <BookingDetails product={product} city={product.city} startDate={startDate} endDate={endDate} hour={bookingHour} />
          </div>
        </div>

        <ProductPolicy policy1={policy1} policy2={policy2} policy3={policy3} />
      </div>
    </div>
  );
}
