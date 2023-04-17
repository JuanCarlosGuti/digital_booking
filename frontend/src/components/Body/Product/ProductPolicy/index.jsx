import "./ProductPolicy.scss";

export default function ProductPolicy(props) {
  return (
    <div className="prodPolicy">
      <div className="prodPolicy__container">
        <h3>Qué tenés que saber </h3>
        <hr />
        <div className="policies">
          <ul>
            <h5>Normas de la casa</h5>
            {props.policy1.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ul>
            <h5>Salud y Seguridad</h5>
            {props.policy2.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ul>
            <h5>Política de cancelación</h5>
            <p>{props.policy3}</p>
          </ul>
        </div>
      </div>
    </div>
  );
}
