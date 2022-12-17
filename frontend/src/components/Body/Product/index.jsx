import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Product.scss";

import ProductCharacteristics from "./ProductCharacteristics";
import ProductDescription from "./ProductDescription";
import ProductHeader from "./ProductHeader";
import ProductImages from "./ProductImages";
import ProductLocation from "./ProductLocation";
import ProductPolicy from "./ProductPolicy";
import ProductCalendar from "./ProductCalendar";
import { getProduct } from "../../../services/fetchService";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [city, setCity] = useState({});
  const [category, setCategory] = useState({});
  const [policy1, setPolicy1] = useState([]);
  const [policy2, setPolicy2] = useState([]);
  const [policy3, setPolicy3] = useState([]);

  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct(res);
      setCity(res.city);
      setCategory(res.category);
      let text = res.extraDescription1.split(",");
      setPolicy1(text);
      text = res.extraDescription2.split(",");
      setPolicy2(text);
      setPolicy3(res.extraDescription3);
      localStorage.setItem("prevUrl", window.location.pathname);
    });
  }, []);

  return (
    <React.Fragment>
      <ProductHeader product={product} city={city} category={category} />
      <ProductLocation city={city} />
      <ProductImages product={product} />
      <ProductDescription product={product} />
      <ProductCharacteristics id={product.id} />
      <ProductCalendar product={product} city={city} category={category} />
      <ProductPolicy policy1={policy1} policy2={policy2} policy3={policy3} />
    </React.Fragment>
  );
}
