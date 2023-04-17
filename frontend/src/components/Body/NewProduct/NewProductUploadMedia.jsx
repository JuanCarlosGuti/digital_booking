import React from "react";
import "./newProduct.scss";

export default function NewProductUploadMedia({
  imageArray,
  setImageArray,
  setLastImg,
}) {
  const interactiveInputs = (obj) => {
    setImageArray([...imageArray, ""]);
  };
  const handleRemove = (pos) => {
    const list = [...imageArray];
    list.splice(pos, 1);
    setImageArray(list);
  };
  const f = (pos, content) => {
    const list = [...imageArray];
    list[pos] = content;
    setImageArray(list);
  };
  return (
    <section className="NewProductUploadMediaContainer">
      <h3>Cargar Imágenes</h3>
      <div className="NewProductUploadMediaContainer_imageContainer">
        <div className="NewProductUploadMediaContainer_imageContainer_imagesBox"></div>
        {imageArray.map((img, i) => (
          <div
            className="NewProductUploadMediaContainer_imageContainer_imagesBox"
            key={i}
          >
            <input
              type="text"
              placeholder="Insertar https://"
              onChange={(e) => f(i, e.target.value)}
            />
            <div
              onClick={() => handleRemove(i)}
              className="NewProductUploadMediaContainer_imageContainer_imagesBox-button"
            >
              -
            </div>
          </div>
        ))}
        <div className="NewProductUploadMediaContainer_imageContainer_imagesBox">
          <input
            type="text"
            placeholder="Insertar https://"
            onChange={(e) => setLastImg(e.target.value)}
          />
          <div
            onClick={() => interactiveInputs({ state: true })}
            className="NewProductUploadMediaContainer_imageContainer_imagesBox-button"
          >
            +
          </div>
        </div>
      </div>
    </section>
  );
}
