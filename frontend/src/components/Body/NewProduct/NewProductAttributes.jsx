import React, { useEffect } from "react";
import attributes from "../../../data/attributes";
import "./newProduct.scss";

export default function NewProductAttributes({ setAttributes }) {
  const attributes1 = attributes.slice(0, attributes.length / 2);
  const attributes2 = attributes.slice(
    attributes.length / 2,
    attributes.length
  );

  useEffect(() => {
    const checks = document.getElementsByClassName("item");
    setAttributes(checks);
  }, []);
  return (
    <section className="NewProductAttributesContainer">
      <h3>Atributos</h3>
      <div className="NewProductAttributesContainer_attributesContainer">
        <div className="NewProductAttributesContainer_attributesContainer_component">
          {attributes1.map((a) => (
            <div
              key={a.id}
              className="NewProductAttributesContainer_attributesContainer-box"
            >
              <label htmlFor="">{a.name}</label>
              <input
                key={a.id}
                type="checkbox"
                value={JSON.stringify(a)}
                className="item"
              />
            </div>
          ))}
        </div>
        <div className="NewProductAttributesContainer_attributesContainer_component">
          {attributes2.map((a) => (
            <div
              key={a.id}
              className="NewProductAttributesContainer_attributesContainer-box"
            >
              <label htmlFor="">{a.name}</label>
              <input
                key={a.id}
                type="checkbox"
                value={JSON.stringify(a)}
                className="item"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
