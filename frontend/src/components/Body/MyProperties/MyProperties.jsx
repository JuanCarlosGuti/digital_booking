import React, { useCallback, useEffect, useState } from "react";
import "./MyProperties.scss";
import "./../ProductList/ProductListStyle.scss";
import { Link, useNavigate } from "react-router-dom";
import { BiBuildingHouse } from "react-icons/bi";
import ProductHeader from "../Product/ProductHeader";
import Paginator from "../../Paginator";
import { useAuth } from "../../../context/AuthContext";
import { getProductsByOwner, deleteProduct } from "../../../services/fetchService";

const PAGE_SIZE = 8;

/** Panel del dueño: sus propiedades publicadas, con editar y eliminar.
 * El backend ya restringe getProductsByOwner/PUT/DELETE al dueño (o admin). */
export default function MyProperties() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const loadProperties = useCallback(() => {
    getProductsByOwner(session.id)
      .then((res) => {
        setProperties(res);
        // Si se borró el último inmueble de la última página, retroceder a una página válida.
        setPage((current) => Math.min(current, Math.max(1, Math.ceil(res.length / PAGE_SIZE))));
      })
      .catch(() => setProperties([]));
  }, [session.id]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleDelete = async (property) => {
    const confirmed = window.confirm(
      `¿Eliminar "${property.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;
    try {
      await deleteProduct(property.id);
      loadProperties();
    } catch (err) {
      setError(err.message || "No se pudo eliminar la propiedad.");
    }
  };

  if (properties === null) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mis Propiedades" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <h4>Cargando tus propiedades...</h4>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="productListMainContainer">
        <ProductHeader product={{ title: "Mis Propiedades" }} category={{ title: "" }} />
        <div className="emptyBooking">
          <BiBuildingHouse />
          <h4>Todavía no publicaste ninguna propiedad</h4>
          <Link to="/admin">Publicar mi primera propiedad</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="productListMainContainer_booking">
      <ProductHeader product={{ title: "Mis Propiedades" }} category={{ title: "" }} />
      {error && <p className="myProperties__error">{error}</p>}
      <div className="productListMainContainer__productList">
        {properties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((p) => (
          <div key={p.id} className="myProperties__card">
            <img
              src={p.coverImageUrl || p.category.imageUrl}
              alt={p.title}
              className="myProperties__image"
              onClick={() => navigate(`/products/${p.id}`)}
            />
            <div className="myProperties__body">
              <span className="myProperties__category">{p.category.title}</span>
              <p className="myProperties__title" onClick={() => navigate(`/products/${p.id}`)}>
                {p.title}
              </p>
              <p className="myProperties__location">
                {p.city.city}, {p.city.department}
              </p>
              <div className="myProperties__actions">
                <button type="button" className="edit" onClick={() => navigate(`/my-properties/edit/${p.id}`)}>
                  Editar
                </button>
                <button type="button" className="delete" onClick={() => handleDelete(p)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginator
        totalItems={properties.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
        onPageChange={(nextPage) => {
          setPage(nextPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
