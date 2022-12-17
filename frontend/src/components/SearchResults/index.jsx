import React, { useEffect, useState } from "react";
import "./../Body/Body.scss";
import "./../Body/ProductList/ProductListStyle.scss";

import {
  getProductByCategory,
  getCategory,
  getProductByCity,
  getCity,
  getProductByDate,
  getProductByCityAndDate,
} from "../../services/fetchService";
import ProductCar from "../../containers/Body/ProductCar";
import { useParams, useNavigate } from "react-router-dom";
import shuffle from "../../services/shuffleService";
import SearchBar from "../Body/SearchBar/SearchBar";
import CategoryList from "../Body/CategoryList/CategoryList";

const SearchResults = (props) => {
  const { type, param } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (type === "category") {
      getProductByCategory(param).then((res) => {
        console.log(res);
        shuffle(res);
        setProducts(res);
      });
      getCategory(param).then((cat) => {
        setCategory(cat.title);
      });
    } else if (type === "city") {
      getProductByCity(param).then((res) => {
        shuffle(res);
        setProducts(res);
      });
      getCity(param).then((city) => {
        let cityCountry = city.city + ", " + city.country;
        setCity(cityCountry);
      });
    } else if (type === "date") {
      if (param === "+") {
        alert("ingrese un criterio de busqueda");
        navigate(-1);
      } else {
        const startDate = param.split("+")[0];
        const endDate = param.split("+")[1];

        getProductByDate(startDate, endDate).then((res) => {
          console.log(res);
          setProducts(res);
          setDate1(startDate);
          setDate2(endDate);
        });
      }
    } else if (type === "cityAndDate") {
      const placeId = param.split("+")[0];
      const startDate = param.split("+")[1];
      const endDate = param.split("+")[2];

      getProductByCityAndDate(startDate, endDate, placeId).then((res) => {
        setProducts(res);
        setDate1(startDate);
        setDate2(endDate);
      });
      getCity(placeId).then((city) => {
        let cityCountry = city.city + ", " + city.country;
        setCity(cityCountry);
      });
    } else {
      navigate("/NotFound");
    }
  }, [type, param]);

  return (
    <div className="body">
      <SearchBar />
      <CategoryList />

      <div className="productListMainContainer" id="title">
        <div className="productListMainContainer__container">
          <h2>
            {" "}
            Resultados de la búsqueda{" "}
            {type === "category"
              ? `de ${category}`
              : type === "city"
              ? `en ${city}`
              : type === "date"
              ? `entre ${date1} y ${date2}`
              : `en ${city} entre ${date1} y ${date2}`}
          </h2>
          <div className="productListMainContainer__productList">
            {products.map((p) => (
              <ProductCar
                key={p.id}
                id={p.id}
                name={p.name}
                title={p.title}
                category={p.category.title}
                image={
                  p.images.length > 0 ? p.images[0].url : p.categoy.imageUrl
                }
                location={p.address}
                description={p.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
