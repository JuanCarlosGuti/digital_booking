import React, { useState } from "react";
import "./newProduct.scss";
import { useNavigate } from "react-router-dom";

import NewProductHeader from "./NewProductHeader";
import NewProductForm from "./NewProductForm";
import NewProductAttributes from "./NewProductAttributes";
import NewProductPolicy from "./NewproductPolicy";
import NewProductUploadMedia from "./NewProductUploadMedia";
import { createProduct } from "../../../services/fetchService";

export default function NewProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [policy1, setPolicy1] = useState("");
  const [policy2, setPolicy2] = useState("");
  const [policy3, setPolicy3] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [lastimg, setLastImg] = useState("");

  const handleSubmit = () => {
    console.log(categoryId);
    if (
      name !== "" &&
      categoryId !== "" &&
      categoryId !== NaN &&
      address !== "" &&
      cityId !== "" &&
      cityId !== NaN &&
      description !== "" &&
      attributes.length !== 0 &&
      policy1 !== "" &&
      policy2 !== "" &&
      policy3 !== "" &&
      imageArray.length !== 0
    ) {
      imageArray.push(lastimg);
      let images = [];
      let features = [];
      imageArray.map((i) => {
        images.push({
          title: name,
          url: i,
        });
        return true;
      });

      for (let index = 0; index < attributes.length; index++) {
        if (attributes[index].checked) {
          let obj = JSON.parse(attributes[index].value);
          features.push({
            feature: {
              id: obj.id,
            },
          });
        }
      }

      const product = {
        name: name,
        title: name,
        description: description,
        address: address,
        roomNumber: 3,
        numberOfBathrooms: 3,
        category: categoryId,
        city: parseInt(cityId),
        images: images,
        attributes: features,
        policy1: policy1,
        policy2: policy2,
        policy3: policy3,
      };
      createProduct(product).then((response) => {
        navigate(`/newProduct/${response.id}/create/results`);
      });
    } else {
      alert("Complete todos los campos");
    }
  };
  return (
    <section className="NewProductMainContainer">
      <NewProductHeader />
      <h3> Crear propiedad</h3>
      <div className="NewProductMainContainer_box">
        <NewProductForm
          setName={setName}
          setCatId={setCategoryId}
          setAddress={setAddress}
          setCityId={setCityId}
          setDescription={setDescription}
        />
        <NewProductAttributes setAttributes={setAttributes} />
        <NewProductPolicy
          setPolicy1={setPolicy1}
          setPolicy2={setPolicy2}
          setPolicy3={setPolicy3}
        />
        <NewProductUploadMedia
          imageArray={imageArray}
          setImageArray={setImageArray}
          setLastImg={setLastImg}
        />
        <div className="NewProductMainContainer_box_ButtonContainer">
          <button onClick={handleSubmit}>Crear</button>
        </div>
      </div>
    </section>
  );
}
