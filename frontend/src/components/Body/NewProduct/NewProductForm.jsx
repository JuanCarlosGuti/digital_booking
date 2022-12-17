import React, { useState, useEffect } from "react";
import { getAllCategory } from "../../../services/fetchService";
import { getAllCities } from "../../../services/fetchService";
import "./newProduct.scss";

export default function NewProductForm({
  setName,
  setCatId,
  setAddress,
  setCityId,
  setDescription,
}) {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getAllCategory().then((response) => {
      setCategories(response);
    });
    getAllCities().then((response) => {
      setCities(response);
      
    });
  }, []);
  return (
    <section className="NewProductFormContainer">
      <form action="">
        <div className="NewProductFormContainer_firstGroup">
          <div className="NewProductFormContainer_firstGroup_formGroupContainer">
            <label htmlFor="">Nombre de la propiedad</label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="">Categoría</label>
            <select
              onChange={(e) => {
                setCatId(parseInt(e.target.value));
              }}
            >
              <option value="">Seleccione la categoría</option>;
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div className="NewProductFormContainer_firstGroup_formGroupContainer">
            <label htmlFor="">Dirección</label>
            <input
              type="text"
              placeholder="Ingrese la dirección"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <label htmlFor="">Ciudad</label>
            <select
              onChange={(e) => {
                setCityId(parseInt(e.target.value));
              }}
            >
              <option value="">Seleccione la ciudad:</option>
              {cities.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="NewProductFormContainer_formGroupContainer">
          <label> Descripción</label>
          <textarea
            placeholder="Escriba aquí"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </form>
    </section>
  );
}
