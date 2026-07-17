import React from "react";
import "./Paginator.scss";

/** Paginador client-side para las vistas de listado (el catálogo completo viaja igual —
 * con el volumen actual no amerita paginación en el backend; si crece, el corte natural
 * es mover page/size a /api/properties). No se renderiza con una sola página. */
export default function Paginator({ totalItems, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="paginator" aria-label="Paginación">
      <button
        type="button"
        className="paginator__arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? "paginator__page paginator__page--active" : "paginator__page"}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="paginator__arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
}
