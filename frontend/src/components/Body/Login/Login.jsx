import React, { useState, useContext } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import EmailContext from "../../../context/Context";
import { useEffect } from "react";
import { RiAlertFill } from "react-icons/ri";
import { parseJwt } from "../../../services/fetchService";
import { authenticateUser } from "../../../services/fetchService";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { email, setEmail } = useContext(EmailContext);
  //Evento
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validación en caso de que algun input se encuentre vacío
    if (password !== "" && emailInput !== "") {
      //Validación del tamaño de la contraseña
      authenticateUser(emailInput, password)
        .then(async (res) => {
          if (res.status === 200) {
            const response = await res.json();
            const user = parseJwt(response.token);
            localStorage.setItem(
              "user",
              JSON.stringify({
                token: response.token,
                id: user.id,
                rol: user.rol,
                name: user.name,
                lastname: user.lastname,
                email: emailInput,
              })
            );
            setEmail(emailInput);
            const regex = new RegExp("products");
            const fromBooking = regex.test(localStorage.prevUrl);
            if (fromBooking) {
              navigate(-1);
            } else {
              navigate("/home");
            }
          } else {
            document.querySelector(".invalid").innerHTML =
              "Credenciales inválidas. Vuelve a intentarlo.";
            document
              .querySelector("#passwordInput")
              .classList.add("errorBorder");
            document.querySelector("#emailInput").classList.add("errorBorder");
          }
        })
        .catch((error) => console.error(error));
    } else {
      document.querySelector(".invalid").innerHTML =
        "Por favor ingrese sus credenciales para acceder.";
      document.querySelector("#emailInput").classList.add("errorBorder");
      document.querySelector("#passwordInput").classList.add("errorBorder");
    }
  };

  useEffect(() => {
    const regex = new RegExp("products");
    const fromBooking = regex.test(localStorage.prevUrl);
    console.log(localStorage.prevUrl);
    console.log(fromBooking);
    if (fromBooking) {
      document.getElementById("fromBooking").classList.remove("hidden");
    }
  }, []);

  return (
    <section className="LoginContainer">
      <div className="LoginContainer__FormContainer">
        <h4 id="fromBooking" className="hidden">
          {" "}
          <RiAlertFill /> Para realizar una reserva necesitas estar logueado
        </h4>
        <p className="LoginContainer__FormContainer--title">Iniciar sesión</p>
        <form onSubmit={handleSubmit}>
          <Link to="/home" className="LoginContainer__FormContainer--close">
            x
          </Link>
          <label className="formLabel" htmlFor="">
            Correo electrónico
          </label>
          <input
            className="formInput"
            id="emailInput"
            type="text"
            onChange={(e) => {
              setEmailInput(e.target.value);
              document.querySelector(".invalid").innerHTML = "";
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
              document.querySelector(".invalid").innerHTML = "";
              document
                .querySelector("#passwordInput")
                .classList.remove("errorBorder");
            }}
          />
          <p className="invalid"></p>
          <Link className="button">
            <button type="submit" onClick={handleSubmit}>
              Ingresar
            </button>
          </Link>
          <p>
            ¿Aún no tienes cuenta? <Link to="/registration">Registrate</Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
