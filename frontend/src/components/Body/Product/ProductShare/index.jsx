import { useEffect, useRef, useState } from "react";
import { RiShareLine, RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";
import "./ProductShare.scss";

/** Compartir la propiedad: Web Share API nativa donde exista (móvil), popover con
 * copiar-link y WhatsApp como fallback (desktop). Sin backend — comparte la URL actual. */
export default function ProductShare({ title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const closeOnOutsideClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  const url = window.location.href;
  const shareText = `${title} — Cesar Travel`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, text: shareText, url });
      } catch {
        // El usuario canceló el diálogo nativo — no es un error.
      }
      return;
    }
    setOpen(!open);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch {
      setOpen(false);
    }
  };

  return (
    <div className="prodShare" ref={boxRef}>
      <button type="button" className="prodShare__button" onClick={handleShare} aria-label="Compartir">
        <RiShareLine />
        <span>Compartir</span>
      </button>
      {open && (
        <div className="prodShare__popover">
          <button type="button" onClick={copyLink}>
            <RiFileCopyLine /> {copied ? "¡Copiado!" : "Copiar link"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <RiWhatsappFill /> WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
