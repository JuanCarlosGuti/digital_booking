import React from "react";
import { ImLocation } from "react-icons/im";
import { RiStarSFill } from "react-icons/ri";
import "./ProductCardStyle.scss";
import { Link } from "react-router-dom";

const ProductCar = (props) => {
  return (
    <div className="productCardMainContainer">
      <div className="productCardMainContainer__imageContainer">
        <img src={props.image} alt="" />
      </div>
      <div className="productCardMainContainer__contentContainer">
        <div className="productCardMainContainer__contentContainer__header">
          <div className="productCardMainContainer__contentContainer__header__startContainer">
            <span>
              {props.category}
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
            </span>
            <p>{props.name}</p>
          </div>
          <div className="productCardMainContainer__contentContainer__header__endContainer">
            <p className="productCardMainContainer__contentContainer__header__endContainer--numberContainer">
              <span>8</span>
            </p>
            <p className="productCardMainContainer__contentContainer__header__endContainer--calification">
              Muy bueno
            </p>
          </div>
        </div>
        <div className="productCardMainContainer__contentContainer__ubicationContainer">
          <p>
            <ImLocation />A 940 de {props.location} -{" "}
            <span>Mostrar en el mapa</span>
          </p>
        </div>
        <div className="productCardMainContainer__contentContainer__footer">
          <p>{props.description}</p>
          <Link to={"/products/" + props.id}  className="buttonEffect2" >Visitar</Link>
        
        </div>
      </div>
    </div>
  );
};
export default ProductCar;
