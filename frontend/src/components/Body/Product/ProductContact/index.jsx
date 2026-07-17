import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChat3Line } from "react-icons/ri";
import { useAuth } from "../../../../context/AuthContext";
import { openChat } from "../../../../services/fetchService";
import "./ProductContact.scss";

/** Contacto con el dueño vía chat interno (ver ADR-0009 — reemplazó al botón de WhatsApp
 * por privacidad: no se expone ningún dato de contacto, la conversación vive en la
 * plataforma). Abre/recupera la conversación y navega al hilo. */
export default function ProductContact({ ownerId, productId }) {
  const { session, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");

  const isOwnProperty = isAuthenticated && ownerId != null && session.id === ownerId;

  if (isOwnProperty || ownerId == null) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="prodContact">
        <div className="prodContact__container">
          <p className="prodContact__cta">
            ¿Te interesa esta propiedad?{" "}
            <Link to="/login">Iniciá sesión para enviarle un mensaje al dueño</Link>
          </p>
        </div>
      </div>
    );
  }

  const handleOpenChat = async () => {
    setError("");
    setOpening(true);
    try {
      const conversation = await openChat(productId);
      navigate(`/messages/${conversation.id}`);
    } catch (err) {
      setError(err.message || "No se pudo abrir el chat. Intente nuevamente.");
      setOpening(false);
    }
  };

  return (
    <div className="prodContact">
      <div className="prodContact__container">
        <button type="button" className="prodContact__button" onClick={handleOpenChat} disabled={opening}>
          <RiChat3Line className="prodContact__icon" />
          {opening ? "Abriendo chat..." : "Enviar mensaje al dueño"}
        </button>
        {error && <p className="prodContact__error">{error}</p>}
      </div>
    </div>
  );
}
