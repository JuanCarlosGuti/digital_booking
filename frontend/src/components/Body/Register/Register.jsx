import React, { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./../../../services/fetchService";

const NAME_PATTERN = /^[A-Za-zÀ-ÿ\s]+$/;
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_PATTERN = /^3\d{9}$/;

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!nombre || !apellido || !email || !password || !passwordRepeat) {
      return "Por favor complete todos los campos.";
    }
    if (!NAME_PATTERN.test(nombre)) {
      return "El campo de nombre solo admite texto";
    }
    if (!NAME_PATTERN.test(apellido)) {
      return "El campo de apellido solo admite texto";
    }
    if (!EMAIL_PATTERN.test(email)) {
      return "Por favor ingrese un email válido.";
    }
    if (celular && !PHONE_PATTERN.test(celular)) {
      return "El celular debe ser colombiano: 10 dígitos empezando por 3.";
    }
    if (password.length < 8) {
      return "La contraseña es demasiado corta. Ingrese al menos 8 caracteres.";
    }
    if (password !== passwordRepeat) {
      return "Las contraseñas no coinciden. Intente nuevamente.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await register(nombre, apellido, email, password, celular);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "No se pudo crear la cuenta. Intente nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="RegisterContainer">
        <div className="RegisterContainer__FormContainer">
          <div className="exito">
            Cuenta creada con éxito!
            <br /> <span className="small">Serás redirigido al login</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="RegisterContainer">
      <div className="RegisterContainer__FormContainer">
        <Link to="/home" className="RegisterContainer__FormContainer--close">
          x
        </Link>

        <p className="RegisterContainer__FormContainer--title">Crear Cuenta</p>
        <form onSubmit={handleSubmit}>
          <div className="RegisterContainer__FormContainer--fullName">
            <label className="formLabel" htmlFor="nombreInput">
              Nombre
            </label>
            <input
              className={`formInput${error ? " errorBorder" : ""}`}
              id="nombreInput"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label className="formLabel" htmlFor="apellidoInput">
              Apellido
            </label>
            <input
              className={`formInput apellido${error ? " errorBorder" : ""}`}
              id="apellidoInput"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <label className="formLabel" htmlFor="emailInput">
            Correo electrónico
          </label>
          <input
            className={`formInput${error ? " errorBorder" : ""}`}
            id="emailInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="formLabel" htmlFor="celularInput">
            Celular (opcional)
          </label>
          <input
            className="formInput"
            id="celularInput"
            type="tel"
            placeholder="3001234567"
            value={celular}
            onChange={(e) => setCelular(e.target.value.trim())}
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

          <label className="formLabel" htmlFor="confirmPasswordInput">
            Confirmar Contraseña
          </label>
          <input
            className={`formInput${error ? " errorBorder" : ""}`}
            id="confirmPasswordInput"
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />

          <p className="invalid">{error}</p>

          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Creando cuenta..." : "Crear Cuenta"}
          </button>

          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
