import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import "./../../../containers/Body/ProductCardStyle.scss";
import "./MyBookings.scss";
import RatingStars from "../../RatingStars";
import { createReview } from "../../../services/fetchService";

export default function BookingCard(props) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (rating === 0) {
      setError("Elegí una calificación de 1 a 5 estrellas.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await createReview(props.productId, rating, comment);
      setReviewOpen(false);
      props.onReviewSubmitted?.();
    } catch (err) {
      setError(err.message || "No se pudo guardar la reseña.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="productCardMainContainer reserva">
      <div className="productCardMainContainer__imageContainer">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="productCardMainContainer__contentContainer">
        <div className="productCardMainContainer__contentContainer__header">
          <div className="productCardMainContainer__contentContainer__header__startContainer">
            <span>{props.category}</span>
            <p>{props.title}</p>
          </div>
          <div className="productCardMainContainer__contentContainer__header__endContainer">
            <p className="productCardMainContainer__contentContainer__header__endContainer--calification">Reserva #</p>
            <p className="productCardMainContainer__contentContainer__header__endContainer--numberContainer">
              <span>{props.id}</span>
            </p>
          </div>
        </div>
        <div className="productAddress">
          <ImLocation />
          <span>
            {" "}
            {props.location}, {props.city.city}, {props.city.department}
          </span>
        </div>
        <div className="dateDetails">
          <hr />
          <div className="dateDetails__in">
            <span>Check In</span> <span>{props.checkIn}</span>
          </div>
          <hr />
          <div className="dateDetails__out">
            <span>Check Out</span> <span>{props.checkOut}</span>
          </div>
          <hr />
        </div>

        {props.canReview && !reviewOpen && (
          <button type="button" className="reviewButton" onClick={() => setReviewOpen(true)}>
            Dejar reseña
          </button>
        )}

        {props.canReview && reviewOpen && (
          <div className="reviewForm">
            <RatingStars value={rating} onSelect={setRating} className="reviewForm__stars" />
            <textarea
              placeholder="Contanos cómo fue tu estadía (opcional)"
              value={comment}
              maxLength={1000}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <p className="reviewForm__error">{error}</p>}
            <div className="reviewForm__actions">
              <button type="button" onClick={() => setReviewOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="primary" onClick={submitReview} disabled={submitting}>
                {submitting ? "Guardando..." : "Publicar reseña"}
              </button>
            </div>
          </div>
        )}

        <button type="button" className="gestionar" onClick={props.onCancel}>
          Cancelar reserva
        </button>
      </div>
    </div>
  );
}
