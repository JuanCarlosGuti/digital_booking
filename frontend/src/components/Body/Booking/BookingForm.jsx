import "./Booking.scss";

export default function BookingForm(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="formContainer">
      <h3>Completá tus datos</h3>
      <form action="">
        <div className="formBlock">
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            className="formInput"
            id="nombreInput"
            value={user.name}
            disabled
          />
        </div>

        <div className="formBlock">
          <label htmlFor="">Apellido</label>
          <input
            type="text"
            className="formInput"
            id="apellidoInput"
            value={user.lastname}
            disabled
          />
        </div>
        <div className="formBlock">
          <label htmlFor="">Correo electrónico</label>
          <input
            type="email"
            className="formInput"
            id="correoInput"
            value={user.email}
            disabled
          />
        </div>
        <div className="formBlock">
          <label htmlFor="">Ciudad</label>
          <input
            type="text"
            className="formInput"
            id="ciudadInput"
            value={props.city.city + "," + props.city.country}
            disabled
          />
        </div>
      </form>
    </div>
  );
}
