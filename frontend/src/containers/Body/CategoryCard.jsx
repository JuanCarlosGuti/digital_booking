import React from "react";
import "./CategoryCardStyle.scss";
import { HashLink } from "react-router-hash-link";

const CategoryCard = (props) => {
  return (
    <HashLink to={"/category/" + props.id + "#title"} className="cardContainer">
      <div className="cardContainer_imageContainer">
        <img src={props.image} alt={props.name}></img>
      </div>
      <div className="cardContainer_contentContainer">
        <h3>{props.name}</h3>
        <div className="cardContainer_contentContainer--text">
          <span>{props.amount}</span>
        </div>
      </div>
    </HashLink>
  );
};
export default CategoryCard;
