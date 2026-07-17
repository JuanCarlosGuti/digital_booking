/** Ícono de marca de Cesar Travel — árbol de cañaguate estilizado.
 * Mismo diseño aprobado en la propuesta de identidad (ver docs/ROADMAP.md). */
export default function CanaguateMark({ className, title = "Cesar Travel" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={title}>
      <path
        d="M100 175 C100 140 96 118 100 95"
        stroke="#8a5a20"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 140 C90 128 80 122 68 120"
        stroke="#8a5a20"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 130 C112 118 122 112 134 110"
        stroke="#8a5a20"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="100" cy="70" r="42" fill="#F6BC2E" />
      <circle cx="60" cy="88" r="30" fill="#F0A600" />
      <circle cx="142" cy="86" r="32" fill="#EE9C00" />
      <circle cx="80" cy="48" r="26" fill="#F6BC2E" />
      <circle cx="126" cy="46" r="27" fill="#F0A600" />
      <circle cx="102" cy="104" r="24" fill="#C7860A" />
      <g fill="#8a5a00" opacity="0.55">
        <circle cx="72" cy="66" r="3" />
        <circle cx="120" cy="60" r="2.5" />
        <circle cx="95" cy="42" r="2.5" />
        <circle cx="140" cy="92" r="3" />
        <circle cx="60" cy="94" r="2.5" />
      </g>
    </svg>
  );
}
