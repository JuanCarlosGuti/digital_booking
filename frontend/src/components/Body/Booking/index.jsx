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

export default function Booking(props) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [city, setCity] = useState({});
  const [category, setCategory] = useState({});
  const [ready, setReady] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bookingHour, setBookinHour] = useState("");
  const [policy1, setPolicy1] = useState([]);
  const [policy2, setPolicy2] = useState([]);
  const [policy3, setPolicy3] = useState([]);

  useEffect(() => {
    if (!ready) {
      getProduct(id).then((res) => {
        console.log(res);
        setProduct(res);
        setCity(res.city);
        setCategory(res.category);
        let text = res.extraDescription1.split(",");
        setPolicy1(text);
        text = res.extraDescription2.split(",");
        setPolicy2(text);
        setPolicy3(res.extraDescription3);
        setReady(true);
      });
    }
  }, [ready]);

  if (!ready) {
    return <h2>Cargando ...</h2>;
  } else
    return (
      <div className="booking">
        <ProductHeader product={product} city={city} category={category} />

        <div className="booking__container">
          <div className="displayDesktop">
            <div className="formAndCalendar">
              <BookingForm city={product.city} />
              <BookingCalendar
                product={product}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
              <BookingTime setBookinHour={setBookinHour} />
            </div>
            <div className="details">
              <BookingDetails
                product={product}
                city={city}
                category={category}
                startDate={startDate}
                endDate={endDate}
                hour={bookingHour}
              />
            </div>
          </div>

          <ProductPolicy
            policy1={policy1}
            policy2={policy2}
            policy3={policy3}
          />
        </div>
      </div>
    );
}
