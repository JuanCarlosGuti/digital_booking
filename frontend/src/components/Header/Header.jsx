import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { getUnreadCount } from "../../services/fetchService";
import CanaguateMark from "../brand/CanaguateMark";

export default function Header() {
  const [sideBar, setSideBar] = useState("sideBarInit");
  const [unread, setUnread] = useState(0);
  const { session, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  // Badge de mensajes sin leer — se refresca al navegar y con un sondeo suave.
  useEffect(() => {
    if (!isAuthenticated) {
      setUnread(0);
      return undefined;
    }
    const load = () => getUnreadCount().then((res) => setUnread(res.unread)).catch(() => {});
    load();
    const interval = setInterval(load, 20000);
    return () => clearInterval(interval);
  }, [isAuthenticated, url]);

  const linkBurguer = (link) => {
    setSideBar("sideBarOff");
    navigate(link);
  };

  const turnSideBar = () => {
    setSideBar((prev) =>
      prev === "sideBarInit" || prev === "sideBarOff" ? "sideBarOn" : "sideBarOff"
    );
  };

  const turnOffSideBar = () => {
    setSideBar("sideBarOff");
  };

  const closeSession = () => {
    logout();
    navigate("/home");
  };

  const initials = isAuthenticated
    ? `${(session.name || "").charAt(0)}${(session.lastname || "").charAt(0)}`
    : "";

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__img">
          <Link to="/home">
            <CanaguateMark className="header__logoMark" />
            <span className="header__logoWordmark">Cesar Travel</span>
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="header__buttons">
            <Link
              className={url === "/registration" ? "button-hide" : "header__buttons--reg buttonEffect"}
              to="/registration"
            >
              Crear cuenta
            </Link>
            <Link
              className={url === "/login" ? "button-hide" : "header__buttons--log buttonEffect"}
              to="/login"
            >
              Iniciar sesión
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="header__user">
            <Link className="header__user--reservas buttonEffect" to="/admin">
              Publicar propiedad
            </Link>
            <Link className="header__user--reservas buttonEffect" to="/my-properties">
              Mis Propiedades
            </Link>
            <Link className="header__user--reservas buttonEffect" to={`/${session.id}/bookings`}>
              Mis Reservas
            </Link>
            <Link className="header__user--reservas buttonEffect header__user--mensajes" to="/messages">
              Mensajes
              {unread > 0 && <span className="header__unreadBadge">{unread}</span>}
            </Link>

            <div className="line"></div>
            <div className="header__user--circle">{initials}</div>
            <div className="header__user--text">
              <span className="header__user--greeting">Hola,</span>
              <span className="header__user--name">{`${session.name} ${session.lastname}`}</span>
            </div>
            <div className="header__user--close">
              <Link onClick={closeSession} to="/home">
                x
              </Link>
            </div>
          </div>
        )}

        <IconContext.Provider value={{ className: "header__hamburguer" }}>
          <GiHamburgerMenu onClick={turnSideBar} />
        </IconContext.Provider>

        {/* Menú hamburguesa */}
        <div className={sideBar}>
          <div className="st1" onClick={turnOffSideBar}>
            <div className="st2"></div>
            <div className="st3"></div>
          </div>

          <div className="sideBarBox">
            {isAuthenticated && sideBar === "sideBarOn" && (
              <div className="userData">
                <div className="userData__data">
                  <div>
                    <span>{initials}</span>
                  </div>
                  <span className="userData__data--greeting">Hola, </span>
                  <span>{`${session.name} ${session.lastname}`}</span>
                </div>
              </div>
            )}
          </div>

          <div className="sideBarLinks">
            {isAuthenticated && sideBar === "sideBarOn" ? (
              <div>
                <div onClick={() => linkBurguer("/home")}>Home</div>
                <div onClick={() => linkBurguer("/admin")}>Publicar propiedad</div>
                <div onClick={() => linkBurguer("/my-properties")}>Mis Propiedades</div>
                <div onClick={() => linkBurguer(`/${session.id}/bookings`)}>Mis Reservas</div>
                <div onClick={() => linkBurguer("/messages")}>
                  Mensajes{unread > 0 ? ` (${unread})` : ""}
                </div>
                <div className="sideBarLinks__closeSession" onClick={closeSession}>
                  ¿Deseas <span className="sideBarLinks__closeSession--link">cerrar sesión</span>?
                </div>
              </div>
            ) : (
              <div>
                <div onClick={() => linkBurguer("/home")}>Home</div>
                <div onClick={() => linkBurguer("/login")}>Iniciar sesión</div>
                <div onClick={() => linkBurguer("/registration")}>Registrarse</div>
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
