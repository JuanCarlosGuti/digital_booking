import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiChat3Line } from "react-icons/ri";
import ProductHeader from "../Product/ProductHeader";
import { getMyChats } from "../../../services/fetchService";
import "./Messages.scss";
import "./../ProductList/ProductListStyle.scss";

/** Bandeja de conversaciones del usuario (como huésped o como dueño). */
export default function Messages() {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      getMyChats()
        .then((res) => {
          if (!cancelled) setChats(res);
        })
        .catch(() => {
          if (!cancelled) setChats([]);
        });
    load();
    // Sondeo suave: la bandeja se refresca sola por si llega un mensaje mientras está abierta.
    const interval = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (chats === null) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mensajes" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <h4>Cargando tus conversaciones...</h4>
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mensajes" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <RiChat3Line />
          <h4>Todavía no tenés conversaciones</h4>
          <p>Abrí el detalle de una propiedad y tocá "Enviar mensaje al dueño".</p>
          <Link to="/home">Buscar propiedades</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="productListMainContainer_booking">
      <ProductHeader product={{ title: "Mensajes" }} category={{ title: "" }} />
      <div className="messagesList">
        {chats.map((chat) => (
          <Link key={chat.id} to={`/messages/${chat.id}`} className="messagesList__item">
            <div className="messagesList__avatar">{chat.otherUserName.charAt(0)}</div>
            <div className="messagesList__body">
              <div className="messagesList__top">
                <span className="messagesList__name">{chat.otherUserName}</span>
                {chat.unreadCount > 0 && <span className="messagesList__badge">{chat.unreadCount}</span>}
              </div>
              <span className="messagesList__property">{chat.productTitle}</span>
              <span className="messagesList__preview">{chat.lastMessage || "Conversación nueva — decí hola"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
