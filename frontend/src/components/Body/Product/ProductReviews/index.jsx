import { useEffect, useState } from "react";
import { getReviewsByProperty } from "../../../../services/fetchService";
import RatingStars from "../../../RatingStars";
import "./ProductReviews.scss";

/** Reseñas del inmueble: promedio grande + lista. Escribir una reseña se hace desde
 * "Mis Reservas" (solo con estadía finalizada) — acá es solo lectura. */
export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (!productId) {
      return undefined;
    }
    let cancelled = false;
    getReviewsByProperty(productId)
      .then((res) => {
        if (!cancelled) setReviews(res);
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (reviews === null) {
    return null;
  }

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="prodReviews">
      <div className="prodReviews__container">
        <h3>Reseñas de huéspedes</h3>
        {reviews.length === 0 && (
          <p className="prodReviews__empty">
            Esta propiedad todavía no tiene reseñas — sé el primero en hospedarte y contarlo.
          </p>
        )}
        {reviews.length > 0 && (
          <>
            <div className="prodReviews__average">
              <span className="prodReviews__averageNumber">{average.toFixed(1)}</span>
              <RatingStars value={average} className="prodReviews__stars" />
              <span className="prodReviews__count">
                {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
              </span>
            </div>
            <ul className="prodReviews__list">
              {reviews.map((review) => (
                <li key={review.id} className="prodReviews__item">
                  <div className="prodReviews__itemHeader">
                    <span className="prodReviews__reviewer">{review.reviewerName}</span>
                    <RatingStars value={review.rating} className="prodReviews__stars" />
                  </div>
                  {review.comment && <p className="prodReviews__comment">{review.comment}</p>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
