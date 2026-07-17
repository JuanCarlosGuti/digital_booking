import React, { useEffect, useState } from "react";
import { getAllFeatures } from "../../../services/fetchService";
import "./newProduct.scss";

// Controlado por el padre (featureIds + setFeatureIds) para poder precargar en modo edición.
export default function NewProductAttributes({ featureIds, setFeatureIds }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    getAllFeatures().then(setFeatures);
  }, []);

  const toggle = (id) => {
    setFeatureIds(
      featureIds.includes(id) ? featureIds.filter((f) => f !== id) : [...featureIds, id]
    );
  };

  const half = Math.ceil(features.length / 2);
  const columns = [features.slice(0, half), features.slice(half)];

  return (
    <section className="NewProductAttributesContainer">
      <h3>Atributos</h3>
      <div className="NewProductAttributesContainer_attributesContainer">
        {columns.map((column, columnIndex) => (
          <div className="NewProductAttributesContainer_attributesContainer_component" key={columnIndex}>
            {column.map((f) => (
              <div key={f.id} className="NewProductAttributesContainer_attributesContainer-box">
                <label htmlFor={`feature-${f.id}`}>{f.name}</label>
                <input
                  id={`feature-${f.id}`}
                  type="checkbox"
                  className="item"
                  checked={featureIds.includes(f.id)}
                  onChange={() => toggle(f.id)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
