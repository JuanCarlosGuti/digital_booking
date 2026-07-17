import React from "react";
import "./newProduct.scss";

// Inputs controlados para poder precargar en modo edición.
export default function NewProductPolicy({
  policy1,
  policy2,
  policy3,
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
          <label htmlFor="policy1Input">Descripción</label>
          <textarea id="policy1Input" value={policy1} onChange={(e) => setPolicy1(e.target.value)} />
        </div>
        <div className="NewProductPolicyContainer_policyContainer-box">
          <h4>Salud y seguridad</h4>
          <label htmlFor="policy2Input">Descripción</label>
          <textarea id="policy2Input" value={policy2} onChange={(e) => setPolicy2(e.target.value)} />
        </div>
        <div className="NewProductPolicyContainer_policyContainer-box">
          <h4>Políticas de cancelación</h4>
          <label htmlFor="policy3Input">Descripción</label>
          <textarea id="policy3Input" value={policy3} onChange={(e) => setPolicy3(e.target.value)} />
        </div>
      </div>
    </section>
  );
}
