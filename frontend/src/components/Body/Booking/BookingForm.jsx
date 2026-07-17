import "./Booking.scss";
import { useAuth } from "../../../context/AuthContext";

export default function BookingForm({ city }) {
  const { session } = useAuth();

  return (
    <div className="formContainer">
      <h3>Completá tus datos</h3>
      <form>
        <div className="formBlock">
          <label htmlFor="nombreInput">Nombre</label>
          <input type="text" className="formInput" id="nombreInput" value={session.name} disabled />
        </div>

        <div className="formBlock">
          <label htmlFor="apellidoInput">Apellido</label>
          <input type="text" className="formInput" id="apellidoInput" value={session.lastname} disabled />
        </div>
        <div className="formBlock">
          <label htmlFor="correoInput">Correo electrónico</label>
          <input type="email" className="formInput" id="correoInput" value={session.email} disabled />
        </div>
        <div className="formBlock">
          <label htmlFor="ciudadInput">Municipio</label>
          <input type="text" className="formInput" id="ciudadInput" value={`${city.city}, ${city.department}`} disabled />
        </div>
      </form>
    </div>
  );
}
