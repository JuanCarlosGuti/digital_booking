import React, { useEffect, useState } from "react";
import "./newProduct.scss";
import { useNavigate, useParams } from "react-router-dom";

import NewProductHeader from "./NewProductHeader";
import NewProductForm from "./NewProductForm";
import NewProductAttributes from "./NewProductAttributes";
import NewProductPolicy from "./NewproductPolicy";
import NewProductUploadMedia from "./NewProductUploadMedia";
import {
  createProduct,
  getProduct,
  updateProduct,
  uploadProductImages,
} from "../../../services/fetchService";

// Crea (POST) o edita (PUT, cuando la ruta trae :id — /my-properties/edit/:id) una propiedad.
export default function NewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [description, setDescription] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  const [featureIds, setFeatureIds] = useState([]);
  const [policy1, setPolicy1] = useState("");
  const [policy2, setPolicy2] = useState("");
  const [policy3, setPolicy3] = useState("");
  const [files, setFiles] = useState([]);
  // El PUT reemplaza todas las imágenes: hay que reenviar las existentes o se pierden.
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    getProduct(id)
      .then((product) => {
        setTitle(product.title);
        setCategoryId(String(product.category.id));
        setAddress(product.address);
        setCityId(String(product.city.id));
        setDescription(product.description);
        setRoomNumber(String(product.roomNumber));
        setNumberOfBathrooms(String(product.numberOfBathrooms));
        setFeatureIds(product.features.map((f) => f.id));
        setPolicy1(product.extraDescription1 || "");
        setPolicy2(product.extraDescription2 || "");
        setPolicy3(product.extraDescription3 || "");
        setExistingImages(product.images);
      })
      .catch(() => setError("No se pudo cargar la propiedad a editar."));
  }, [id, isEditing]);

  const handleSubmit = async () => {
    if (
      title === "" ||
      categoryId === "" ||
      address === "" ||
      cityId === "" ||
      description === "" ||
      roomNumber === "" ||
      numberOfBathrooms === "" ||
      featureIds.length === 0 ||
      policy1 === "" ||
      policy2 === "" ||
      policy3 === ""
    ) {
      setError("Complete todos los campos.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const body = {
        title,
        description,
        address,
        roomNumber: Number(roomNumber),
        numberOfBathrooms: Number(numberOfBathrooms),
        extraDescription1: policy1,
        extraDescription2: policy2,
        extraDescription3: policy3,
        categoryId: Number(categoryId),
        cityId: Number(cityId),
        featureIds,
      };

      let product;
      if (isEditing) {
        product = await updateProduct(id, {
          ...body,
          images: existingImages.map((img) => ({ title: img.title, url: img.url })),
        });
      } else {
        product = await createProduct(body);
      }

      if (files.length > 0) {
        try {
          await uploadProductImages(product.id, files);
        } catch (uploadErr) {
          // La propiedad ya se guardó — el upload es best-effort, no bloquea el flujo.
          console.error("No se pudieron subir las imágenes:", uploadErr.message);
        }
      }

      if (isEditing) {
        navigate("/my-properties");
      } else {
        navigate(`/product/${product.id}/create/results`);
      }
    } catch (err) {
      setError(err.message || "No se pudo guardar la propiedad. Intente nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="NewProductMainContainer">
      <NewProductHeader />
      <h3>{isEditing ? "Editar propiedad" : "Crear propiedad"}</h3>
      <div className="NewProductMainContainer_box">
        <NewProductForm
          title={title}
          categoryId={categoryId}
          address={address}
          cityId={cityId}
          description={description}
          roomNumber={roomNumber}
          numberOfBathrooms={numberOfBathrooms}
          setTitle={setTitle}
          setCategoryId={setCategoryId}
          setAddress={setAddress}
          setCityId={setCityId}
          setDescription={setDescription}
          setRoomNumber={setRoomNumber}
          setNumberOfBathrooms={setNumberOfBathrooms}
        />
        <NewProductAttributes featureIds={featureIds} setFeatureIds={setFeatureIds} />
        <NewProductPolicy
          policy1={policy1}
          policy2={policy2}
          policy3={policy3}
          setPolicy1={setPolicy1}
          setPolicy2={setPolicy2}
          setPolicy3={setPolicy3}
        />
        {isEditing && existingImages.length > 0 && (
          <section className="NewProductUploadMediaContainer">
            <h3>Imágenes actuales</h3>
            <div className="NewProductUploadMediaContainer_imageContainer">
              {existingImages.map((img) => (
                <div className="NewProductUploadMediaContainer_imageContainer_imagesBox" key={img.id}>
                  <img
                    src={img.url}
                    alt={img.title}
                    className="NewProductUploadMediaContainer_imageContainer_imagesBox-preview"
                  />
                  <div
                    onClick={() => setExistingImages(existingImages.filter((i) => i.id !== img.id))}
                    className="NewProductUploadMediaContainer_imageContainer_imagesBox-button"
                  >
                    -
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <NewProductUploadMedia files={files} setFiles={setFiles} />
        {error && <p className="formError">{error}</p>}
        <div className="NewProductMainContainer_box_ButtonContainer">
          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </div>
    </section>
  );
}
