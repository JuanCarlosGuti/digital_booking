import React, { useState, useEffect } from "react";
import { getAllCategories, getAllCities } from "../../../services/fetchService";
import "./newProduct.scss";

// Inputs controlados (value + onChange) para poder precargar el formulario en modo edición.
export default function NewProductForm({
  title,
  categoryId,
  address,
  cityId,
  description,
  roomNumber,
  numberOfBathrooms,
  setTitle,
  setCategoryId,
  setAddress,
  setCityId,
  setDescription,
  setRoomNumber,
  setNumberOfBathrooms,
}) {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
    getAllCities().then(setCities);
  }, []);

  return (
    <section className="NewProductFormContainer">
      <form>
        <div className="NewProductFormContainer_firstGroup">
          <div className="NewProductFormContainer_firstGroup_formGroupContainer">
            <label htmlFor="titleInput">Título de la propiedad</label>
            <input
              id="titleInput"
              type="text"
              placeholder="Ingrese el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="categoryInput">Categoría</label>
            <select id="categoryInput" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Seleccione la categoría</option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <label htmlFor="roomNumberInput">Habitaciones</label>
            <input
              id="roomNumberInput"
              type="number"
              min="1"
              placeholder="Cantidad de habitaciones"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            <label htmlFor="bathroomsInput">Baños</label>
            <input
              id="bathroomsInput"
              type="number"
              min="1"
              placeholder="Cantidad de baños"
              value={numberOfBathrooms}
              onChange={(e) => setNumberOfBathrooms(e.target.value)}
            />
          </div>
          <div className="NewProductFormContainer_firstGroup_formGroupContainer">
            <label htmlFor="addressInput">Dirección</label>
            <input
              id="addressInput"
              type="text"
              placeholder="Ingrese la dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="cityInput">Municipio</label>
            <select id="cityInput" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              <option value="">Seleccione el municipio:</option>
              {cities.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="NewProductFormContainer_formGroupContainer">
          <label htmlFor="descriptionInput">Descripción</label>
          <textarea
            id="descriptionInput"
            placeholder="Escriba aquí"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
}
