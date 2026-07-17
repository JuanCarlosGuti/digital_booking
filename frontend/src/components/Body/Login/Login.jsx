import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiAlertFill } from "react-icons/ri";
import { login } from "../../../services/fetchService";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: applySession } = useAuth();

  const fromBooking = location.state?.from?.pathname?.startsWith("/product/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password === "" || emailInput === "") {
      setError("Por favor ingrese sus credenciales para acceder.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await login(emailInput, password);
      applySession(response.token);
      const redirectTo = location.state?.from?.pathname || "/home";
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Credenciales inválidas. Vuelve a intentarlo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="LoginContainer">
      <div className="LoginContainer__FormContainer">
        {fromBooking && (
          <h4 className="fromBooking">
            <RiAlertFill /> Para realizar una reserva necesitas estar logueado
          </h4>
        )}
        <p className="LoginContainer__FormContainer--title">Iniciar sesión</p>
        <form onSubmit={handleSubmit}>
          <Link to="/home" className="LoginContainer__FormContainer--close">
            x
          </Link>
          <label className="formLabel" htmlFor="emailInput">
            Correo electrónico
          </label>
          <input
            className={`formInput${error ? " errorBorder" : ""}`}
            id="emailInput"
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <label className="formLabel" htmlFor="passwordInput">
            Contraseña
          </label>
          <input
            className={`formInput${error ? " errorBorder" : ""}`}
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="invalid">{error}</p>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
          <p>
            ¿Aún no tienes cuenta? <Link to="/registration">Registrate</Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
