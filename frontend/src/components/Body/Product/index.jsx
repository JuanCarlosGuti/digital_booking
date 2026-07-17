import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Product.scss";

import ProductCharacteristics from "./ProductCharacteristics";
import ProductContact from "./ProductContact";
import ProductDescription from "./ProductDescription";
import ProductHeader from "./ProductHeader";
import ProductImages from "./ProductImages";
import ProductLocation from "./ProductLocation";
import ProductMap from "./ProductMap";
import ProductPolicy from "./ProductPolicy";
import ProductReviews from "./ProductReviews";
import ProductCalendar from "./ProductCalendar";
import ProductOccupants from "./ProductOccupants";
import { getProduct } from "../../../services/fetchService";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) {
    return null;
  }

  const policy1 = (product.extraDescription1 || "").split(",").filter(Boolean);
  const policy2 = (product.extraDescription2 || "").split(",").filter(Boolean);
  const policy3 = product.extraDescription3 || "";

  return (
    <React.Fragment>
      <ProductHeader
        product={product}
        city={product.city}
        category={product.category}
        shareTitle={product.title}
      />
      <ProductLocation city={product.city} />
      <ProductImages product={product} />
      <ProductDescription product={product} />
      <ProductContact ownerId={product.ownerId} productId={product.id} />
      <ProductCharacteristics features={product.features} />
      <ProductCalendar productId={product.id} />
      <ProductPolicy policy1={policy1} policy2={policy2} policy3={policy3} />
      <ProductMap city={product.city} title={product.title} />
      <ProductReviews productId={product.id} />
      <ProductOccupants productId={product.id} ownerId={product.ownerId} />
    </React.Fragment>
  );
}
