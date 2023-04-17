import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";
import logoSm from "./../../img/logoSmYellow.jpg";
import logoLg from "./../../img/logoLgYellow.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import EmailContext from "../../context/Context";
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

export default function Header() {
  const [flag, setFlag] = useState(false);
  const [sideBar, setSideBar] = useState("sideBarInit");
  const { email, setEmail } = useContext(EmailContext);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  const location = useLocation();
  const url = location.pathname;

  const [user, setUser] = useState({ name: "", lastname: "", email: "" });
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      document.querySelector(".header__buttons").classList.add("hidden");
      document.querySelector(".header__user").classList.remove("hidden");
      setUserId(JSON.parse(localStorage.getItem("user")).id);
      setFlag(true);
    } else {
      document.querySelector(".header__buttons").classList.remove("hidden");
      document.querySelector(".header__user").classList.add("hidden");
    }
  }, [email, login, flag]);

  function linkBurguer(link) {
    setSideBar("sideBarOff");
    navigate(link);
  }

  function turnSideBar() {
    if (sideBar === "sideBarInit") {
      setSideBar("sideBarOn");
    } else if (sideBar === "sideBarOn") {
      setSideBar("sideBarOff");
    } else if (sideBar === "sideBarOff") {
      setSideBar("sideBarOn");
    }
  }

  function turnOffSideBar() {
    setSideBar("sideBarOff");
  }

  const closeSession = () => {
    localStorage.clear();
    setEmail("");
    setFlag(false);
    setUser({ name: "", lastname: "", email: "" });
    setLogin(false);
    navigate("./home");
  };

  function checkPath() {
    const regex = new RegExp("products");
    const fromBooking = regex.test(window.location.pathname);
    if (fromBooking) {
      localStorage.setItem("prevUrl", "desdeHeader");
    }
  }
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__img">
          <Link to="./home">
            <img className="header__imgSmall" src={logoSm} alt="DB" />
            <img className="header__imgLarge" src={logoLg} alt="DB" />
          </Link>
        </div>
        <div className="header__buttons">
          <Link
            className={url === "/registration" ? "button-hide" : "header__buttons--reg buttonEffect"}
            to="./registration"
          >
            Crear cuenta
          </Link>
          <Link
            className={url === "/login" ? "button-hide" : "header__buttons--log buttonEffect"}
            to="./login"
            onClick={checkPath}
          >
            Iniciar sesión
          </Link>
        </div>

        <div className="header__user hidden">
          {localStorage.user &&
          JSON.parse(localStorage.user).rol === "ADMIN" ? (
            <Link className="header__user--reservas buttonEffect" to={`/admin`}>
              Administración
            </Link>
          ) : (
            localStorage.user && (
              <Link
                className="header__user--reservas buttonEffect"
                to={`/${userId}/bookings`}
              >
                Mis Reservas
              </Link>
            )
          )}

          <div className="line"></div>
          <div className="header__user--circle">{`${user.name[0] || ""}${
            user.lastname[0] || ""
          }`}</div>
          <div className="header__user--text">
            <span className="header__user--greeting">Hola,</span>
            <span className="header__user--name">{`${user.name} ${user.lastname}`}</span>
          </div>
          <div className="header__user--close">
            <Link onClick={closeSession} to="/home">
              x
            </Link>
          </div>
        </div>

        <IconContext.Provider value={{ className: "header__hamburguer" }}>
          <GiHamburgerMenu onClick={turnSideBar} />
        </IconContext.Provider>

        {/* burguer menu */}
        <div className={sideBar}>
          <div className="st1" onClick={turnOffSideBar}>
            <div className="st2"></div>
            <div className="st3"></div>
          </div>

          <div className="sideBarBox">
            {localStorage.user && sideBar === "sideBarOn" ? (
              <div className="userData">
                <div className="userData__data">
                  <div>
                    <span>{`${user.name[0] || ""}${
                      user.lastname[0] || ""
                    }`}</span>
                  </div>
                  <span className="userData__data--greeting">Hola, </span>
                  <span>{`${user.name} ${user.lastname}`}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="sideBarLinks">
            {localStorage.user && sideBar === "sideBarOn" ? (
              <div>
                {/* <p>Menu</p> */}
                <div onClick={() => linkBurguer("/home")}>Home</div>
                {JSON.parse(localStorage.user).rol === "ADMIN" ? (
                  <div onClick={() => linkBurguer("/admin")}>
                    Administración
                  </div>
                ) : (
                  <div onClick={() => linkBurguer(`/${userId}/bookings`)}>
                    Mis Reservas
                  </div>
                )}
                <div
                  className="sideBarLinks__closeSession"
                  onClick={closeSession}
                  to="/home"
                >
                  ¿Deseas{" "}
                  <span className="sideBarLinks__closeSession--link">
                    {" "}
                    cerrar sesión
                  </span>
                  ?
                </div>
              </div>
            ) : (
              <div>
                {/* <p>Menu</p> */}
                <div onClick={() => linkBurguer("/home")}>Home</div>
                <div onClick={() => linkBurguer("/login")}>Iniciar sesión</div>
                <div onClick={() => linkBurguer("/registration")}>
                  Registrarse
                </div>
                <div onClick={() => linkBurguer("/admin")}>Administración</div>
                <div
                  className="header__user--close hidden"
                  onClick={closeSession}
                >
                  Cerrar Sesión
                </div>
              </div>
            )}
            <hr />
            <div className="footer__icons">
              <BsFacebook />
              <FaLinkedinIn />
              <BsTwitter />
              <BsInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
