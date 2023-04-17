import "./NotFound.scss";
import { Link } from "react-router-dom";
import logoLg from "./../../img/logoLgYellow.jpg";

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="codigo">404</div>
      <h2>Not found</h2>
      <h4>Ooops, parece que esta página no existe!</h4>
      <div className="link">
        <Link to="/home">
          <img src={logoLg} alt="DB" />
        </Link>
      </div>
    </div>
  );
}
