import React from "react";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";

/** 5 estrellas pintadas según `value` (redondeado). Con `onSelect` se vuelve interactivo
 * (formulario de reseña); sin él es solo lectura (tarjetas, detalle). */
export default function RatingStars({ value = 0, onSelect, className = "" }) {
  const rounded = Math.round(value);

  return (
    <span className={`ratingStars ${className}`} role={onSelect ? "radiogroup" : undefined}>
      {[1, 2, 3, 4, 5].map((star) =>
        onSelect ? (
          <button
            key={star}
            type="button"
            className="ratingStars__starButton"
            aria-label={`${star} estrellas`}
            onClick={() => onSelect(star)}
          >
            {star <= rounded ? <RiStarSFill /> : <RiStarSLine />}
          </button>
        ) : star <= rounded ? (
          <RiStarSFill key={star} />
        ) : (
          <RiStarSLine key={star} />
        )
      )}
    </span>
  );
}
