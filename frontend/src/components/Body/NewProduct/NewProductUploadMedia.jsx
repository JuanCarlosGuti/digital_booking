import React from "react";
import "./newProduct.scss";

// Carga real de archivos (ver ADR-0005 y docs/ROADMAP.md) — reemplaza el input de URL a mano.
// Los archivos quedan en memoria hasta el submit; recién ahí se suben (POST
// /api/properties/{id}/images) porque el endpoint de upload requiere que la propiedad ya exista.
export default function NewProductUploadMedia({ files, setFiles }) {
  const addFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    setFiles([...files, ...selected]);
    event.target.value = "";
  };

  const removeFile = (index) => {
    const next = [...files];
    next.splice(index, 1);
    setFiles(next);
  };

  return (
    <section className="NewProductUploadMediaContainer">
      <h3>Cargar Imágenes</h3>
      <div className="NewProductUploadMediaContainer_imageContainer">
        {files.map((file, i) => (
          <div className="NewProductUploadMediaContainer_imageContainer_imagesBox" key={`${file.name}-${i}`}>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="NewProductUploadMediaContainer_imageContainer_imagesBox-preview"
            />
            <div
              onClick={() => removeFile(i)}
              className="NewProductUploadMediaContainer_imageContainer_imagesBox-button"
            >
              -
            </div>
          </div>
        ))}
        <label className="NewProductUploadMediaContainer_imageContainer_imagesBox NewProductUploadMediaContainer_imageContainer_imagesBox-upload">
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addFiles} hidden />
          <span className="NewProductUploadMediaContainer_imageContainer_imagesBox-button">+</span>
        </label>
      </div>
    </section>
  );
}
