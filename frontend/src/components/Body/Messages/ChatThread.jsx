import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useAuth } from "../../../context/AuthContext";
import {
  getMyChats,
  getChatMessages,
  sendChatMessage,
  markChatRead,
} from "../../../services/fetchService";
import "./Messages.scss";

const POLL_MS = 4000;

/** Hilo de una conversación: sondeo cada pocos segundos mientras está abierto (ver ADR-0009 —
 * suficiente para coordinar una reserva; si el chat se vuelve intensivo, el paso siguiente
 * es WebSocket). Al abrir, los mensajes recibidos se marcan como leídos. */
export default function ChatThread() {
  const { id } = useParams();
  const { session } = useAuth();
  const [messages, setMessages] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const lastCountRef = useRef(0);

  const loadMessages = useCallback(() => {
    getChatMessages(id)
      .then((res) => {
        setMessages(res);
        // Solo autoscroll cuando entran mensajes nuevos, no en cada sondeo.
        if (res.length !== lastCountRef.current) {
          lastCountRef.current = res.length;
          markChatRead(id).catch(() => {});
          setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
        }
      })
      .catch(() => setMessages([]));
  }, [id]);

  useEffect(() => {
    getMyChats()
      .then((chats) => setChatInfo(chats.find((c) => String(c.id) === id) || null))
      .catch(() => {});
    loadMessages();
    const interval = setInterval(loadMessages, POLL_MS);
    return () => clearInterval(interval);
  }, [id, loadMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    try {
      await sendChatMessage(id, body);
      setDraft("");
      loadMessages();
    } catch {
      // el mensaje queda en el input — el usuario puede reintentar
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chatThread">
      <div className="chatThread__header">
        <div className="chatThread__headerContainer">
          <Link to="/messages" className="chatThread__back" aria-label="Volver a mensajes">
            <IoIosArrowBack />
          </Link>
          <div>
            <div className="chatThread__name">{chatInfo ? chatInfo.otherUserName : "Conversación"}</div>
            {chatInfo && (
              <Link to={`/products/${chatInfo.productId}`} className="chatThread__property">
                {chatInfo.productTitle}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="chatThread__messages">
        {messages === null && <p className="chatThread__status">Cargando mensajes...</p>}
        {messages && messages.length === 0 && (
          <p className="chatThread__status">Conversación nueva — escribí el primer mensaje.</p>
        )}
        {messages &&
          messages.map((m) => (
            <div
              key={m.id}
              className={m.senderId === session.id ? "chatThread__bubble chatThread__bubble--mine" : "chatThread__bubble"}
            >
              <p>{m.body}</p>
              <span className="chatThread__time">{m.createdAt?.slice(11, 16)}</span>
            </div>
          ))}
        <div ref={bottomRef} />
      </div>

      <form className="chatThread__composer" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Escribí un mensaje..."
          value={draft}
          maxLength={1000}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" disabled={sending || !draft.trim()} aria-label="Enviar">
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
}
