import "./ProductHeader.scss";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import ProductShare from "../ProductShare";

export default function ProductHeader(props) {
  const navigate = useNavigate();
  return (
    <div className="productHeader">
      <div className="productHeader__container">
        <div>
          <div className="category">{props.category.title}</div>
          <div className="title">{props.product.title}</div>
        </div>

        <div className="productHeader__actions">
          {/* shareTitle es opcional: MyBookings también renderiza este header, sin compartir. */}
          {props.shareTitle && <ProductShare title={props.shareTitle} />}
          <IconContext.Provider value={{ className: "backButton" }}>
            <IoIosArrowBack onClick={() => navigate(-1)} />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
