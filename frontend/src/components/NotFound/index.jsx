import "./NotFound.scss";
import { Link } from "react-router-dom";
import CanaguateMark from "../brand/CanaguateMark";

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="codigo">404</div>
      <h2>No encontramos esta página</h2>
      <h4>El enlace puede estar roto o la página ya no existe.</h4>
      <div className="link">
        <Link to="/home">
          <CanaguateMark className="notFound__logo" />
        </Link>
      </div>
    </div>
  );
}
