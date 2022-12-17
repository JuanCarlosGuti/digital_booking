import React from "react";
import "./newProduct.scss";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function NewProductHeader() {
  const navigate = useNavigate();
  return (
    <section className="NewProductHeaderContainer">
      <div className="NewProductHeaderContainer_box">
        <p>Administración</p>
        <div>
          <IoIosArrowBack onClick={() => navigate(-1)} />
        </div>
      </div>
    </section>
  );
}
