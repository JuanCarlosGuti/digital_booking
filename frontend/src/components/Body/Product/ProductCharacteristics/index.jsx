import "./ProductCharacteristics.scss";
import aire from "../../../../img/aire.svg";
import cocina from "../../../../img/cocina.svg";
import detector from "../../../../img/detector.svg";
import estacionamiento from "../../../../img/estacionamiento.svg";
import gimnasio from "../../../../img/gimnasio.svg";
import jacuzzi from "../../../../img/jacuzzi.svg";
import lavadora from "../../../../img/lavadora.svg";
import piscina from "../../../../img/piscina.svg";
import televisor from "../../../../img/televisor.svg";
import wifi from "../../../../img/wifi.svg";

const ICONS_BY_REFERENCE = {
  aire,
  cocina,
  detector,
  estacionamiento,
  gimnasio,
  jacuzzi,
  lavadora,
  piscina,
  televisor,
  wifi,
};

export default function ProductCharacteristics({ features = [] }) {
  if (features.length === 0) {
    return null;
  }

  return (
    <div className="prodCharacteristics">
      <div className="prodCharacteristics__container">
        <h3>¿Qué ofrece este lugar?</h3>
        <hr />
        <div className="icons">
          {features.map((item) => (
            <div key={item.id}>
              <img src={ICONS_BY_REFERENCE[item.referenceIcon]} alt="" />
              <span className="descripcion">{item.name === "Estacionamiento" ? "Parking" : item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
