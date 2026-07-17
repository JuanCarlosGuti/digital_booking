import React from "react";
import { ImLocation } from "react-icons/im";
import "./ProductCardStyle.scss";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";

const ProductCar = (props) => {
  const hasReviews = props.reviewCount > 0;

  return (
    <div className="productCardMainContainer">
      <div className="productCardMainContainer__imageContainer">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="productCardMainContainer__contentContainer">
        <div className="productCardMainContainer__contentContainer__header">
          <div className="productCardMainContainer__contentContainer__header__startContainer">
            <span>
              {props.category}
              {hasReviews ? (
                <>
                  <RatingStars
                    value={props.avgRating}
                    className="productCardMainContainer__contentContainer__header__startContainer--star"
                  />
                  ({props.reviewCount})
                </>
              ) : (
                <span className="sinResenas"> · Sin reseñas aún</span>
              )}
            </span>
            <p>{props.title}</p>
          </div>
        </div>
        <div className="productCardMainContainer__contentContainer__ubicationContainer">
          <p>
            <ImLocation /> {props.location}
          </p>
        </div>
        <div className="productCardMainContainer__contentContainer__footer">
          <Link to={"/products/" + props.id} className="buttonEffect2">
            Visitar
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductCar;
