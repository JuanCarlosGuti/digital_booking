import React, { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "./../../../services/fetchService";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigate = useNavigate();

  const clearError = () => {
    document.querySelector(".invalid").innerHTML = "";
  };

  const errorMessage = (message) => {
    document.querySelector(".invalid").innerHTML = message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nombre === "" ||
      apellido === "" ||
      email === "" ||
      password === "" ||
      passwordRepeat === ""
    ) {
      errorMessage("Por favor complete todos los campos.");
    } else if (!/^[A-Za-z]+$/.test(nombre)) {
      errorMessage("El campo de nombre solo admite texto");
      document.querySelector("#nombreInput").classList.add("errorBorder");
    } else if (!/^[A-Za-z]+$/.test(apellido)) {
      errorMessage("El campo de apellido solo admite texto");
      document.querySelector("#apellidoInput").classList.add("errorBorder");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errorMessage("Por favor ingrese un email válido.");
      document.querySelector("#emailInput").classList.add("errorBorder");
    } else if (password.length < 6) {
      errorMessage(
        "La contraseña es demasiado corta. Ingrese al menos 6 caracteres."
      );
      document.querySelector("#passwordInput").classList.add("errorBorder");
      document
        .querySelector("#confirmPasswordInput")
        .classList.add("errorBorder");
    } else if (password !== passwordRepeat) {
      errorMessage("Las contraseñas no coinciden. Intente nuevamente.");
      document.querySelector("#passwordInput").classList.add("errorBorder");
      document
        .querySelector("#confirmPasswordInput")
        .classList.add("errorBorder");
    } else {
      postUser(nombre, apellido, email, password).then((response) => {
        if (response.status === 201) {
          document.querySelector(".exito").classList.remove("hidden");
          document.querySelector("form").classList.add("hidden");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          errorMessage("El usuario ya existe");
          document.querySelector("#emailInput").classList.add("errorBorder");
        }
      });
    }
  };

  return (
    <section className="RegisterContainer">
      <div className="RegisterContainer__FormContainer">
        <Link to="/home" className="RegisterContainer__FormContainer--close">
          x
        </Link>

        <p className="RegisterContainer__FormContainer--title">Crear Cuenta</p>
        <form>
          <div className="RegisterContainer__FormContainer--fullName">
            <label className="formLabel" htmlFor="">
              Nombre
            </label>

            <input
              className="formInput"
              id="nombreInput"
              type="text"
              onChange={(e) => {
                setNombre(e.target.value);
                clearError();
              }}
            />

            <label className="formLabel" htmlFor="">
              Apellido
            </label>

            <input
              className="formInput apellido"
              id="apellidoInput"
              type="text"
              onChange={(e) => {
                setApellido(e.target.value);
                clearError();
              }}
            />
          </div>
          <label className="formLabel" htmlFor="">
            Correo electrónico
          </label>

          <input
            className="formInput"
            id="emailInput"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
              document
                .querySelector("#emailInput")
                .classList.remove("errorBorder");
            }}
          />

          <label className="formLabel" htmlFor="">
            Contraseña
          </label>

          <input
            className="formInput"
            id="passwordInput"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
              document
                .querySelector("#passwordInput")
                .classList.remove("errorBorder");
            }}
          />

          <label className="formLabel" htmlFor="">
            Confirmar Contraseña
          </label>

          <input
            className="formInput"
            id="confirmPasswordInput"
            type="password"
            onChange={(e) => {
              setPasswordRepeat(e.target.value);
              clearError();
              document
                .querySelector("#confirmPasswordInput")
                .classList.remove("errorBorder");
            }}
          />

          <p className="invalid"></p>

          <button className="button" type="submit" onClick={handleSubmit}>
            Crear Cuenta
          </button>

          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>

        <div className="exito hidden">
          Cuenta creada con éxito!
          <br /> <span className="small">Serás redirigido al login</span>
        </div>
      </div>
    </section>
  );
};

export default Register;
