import "./ProductHeader.scss";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";

export default function ProductHeader(props) {
  const navigate = useNavigate();
  return (
    <div className="productHeader">
    <div className="productHeader__container">
      <div>
        <div className="category">{props.category.title}</div>
        <div className="title">{props.product.name}</div>
      </div>

      <IconContext.Provider value={{ className: "backButton" }}>
        <IoIosArrowBack onClick={() => navigate(-1)} />
      </IconContext.Provider>
    </div>
    </div>
  );
}
