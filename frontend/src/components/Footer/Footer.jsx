import "./Footer.scss";

import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <p>© {new Date().getFullYear()} Cesar Travel</p>
        <div>
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
