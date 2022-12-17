import "./Footer.scss";

//importar el icono a usar
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Body() {
  return (
    <div className="footer">
      <div className="footer__container">
        <p>©2022 Digital Booking</p>
        <div>
          {/* aca llama el icono */}
          <IconContext.Provider value={{ className: "footer__icons" }}>
            <BsFacebook />
            <FaLinkedinIn />
            <BsTwitter />
            <BsInstagram />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
