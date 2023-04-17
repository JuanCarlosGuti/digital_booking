import React from "react";
import "./newProduct.scss";

export default function NewProductPolicy({
  setPolicy1,
  setPolicy2,
  setPolicy3,
}) {
  return (
    <section className="NewProductPolicyContainer">
      <h3>Políticas del producto</h3>
      <div className="NewProductPolicyContainer_policyContainer">
        <div className="NewProductPolicyContainer_policyContainer-box">
          <h4>Normas de la casa</h4>
          <label htmlFor="">Descripción</label>
          <textarea
            onChange={(e) => {
              setPolicy1(e.target.value);
            }}
          />
        </div>
        <div className="NewProductPolicyContainer_policyContainer-box">
          <h4>Salud y seguridad</h4>
          <label htmlFor="">Descripción</label>
          <textarea
            onChange={(e) => {
              setPolicy2(e.target.value);
            }}
          />
        </div>
        <div className="NewProductPolicyContainer_policyContainer-box">
          <h4>Políticas de cancelación</h4>
          <label htmlFor="">Descripción</label>
          <textarea
            onChange={(e) => {
              setPolicy3(e.target.value);
            }}
          />
        </div>
      </div>
    </section>
  );
}
