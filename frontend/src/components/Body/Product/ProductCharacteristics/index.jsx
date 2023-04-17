import "./ProductCharacteristics.scss";
import { useParams } from "react-router-dom";
import { getFeaturesByProduct } from "../../../../services/fetchService";
import { useState, useEffect } from "react";


const images = require.context("../../../../img", true);

export default function ProductCharacteristics(props) {
  const [features, setFeatures] = useState([]);
  const loadImage = (imageName) => images(`./${imageName}.svg`);
  const [ready, setReady] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getFeaturesByProduct(id).then((res) => {
      setFeatures(res);
      setReady(true);
     
    });
  }, [id, ready]);

  if (ready) {
    return (
      <div className="prodCharacteristics">
      <div className="prodCharacteristics__container">
        <h3>¿Qué ofrece este lugar?</h3>
        <hr />
        <div className="icons">
          {features.map((item, index) => (
            <div key={index}>
              <img src={loadImage(item.referenceIcon)} alt="" />
              <span className="descripcion">{item.name==="Estacionamiento"?"Parking":item.name}</span>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  } else return <h1>Cargando</h1>;
}
