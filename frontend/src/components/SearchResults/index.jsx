import React, { useEffect, useState } from "react";
import "./../Body/Body.scss";
import "./../Body/ProductList/ProductListStyle.scss";

import {
  getAllProducts,
  getAllCategories,
  getAllCities,
  getUnavailableProductIds,
  getReviewSummaries,
} from "../../services/fetchService";
import ProductCar from "../../containers/Body/ProductCar";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import shuffle from "../../services/shuffleService";
import SearchBar from "../Body/SearchBar/SearchBar";
import CategoryList from "../Body/CategoryList/CategoryList";
import Paginator from "../Paginator";

const PAGE_SIZE = 8;

const SearchResults = () => {
  const { type, param } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [page, setPage] = useState(1);
  const [placeLabel, setPlaceLabel] = useState("");
  const navigate = useNavigate();

  // Rango opcional (?from=yyyy-MM-dd&to=...): si viene, se excluyen los inmuebles ocupados.
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    const loadProducts = async (filter) => {
      const [results, unavailableIds] = await Promise.all([
        getAllProducts(filter),
        from && to ? getUnavailableProductIds(from, to).catch(() => []) : Promise.resolve([]),
      ]);
      const unavailable = new Set(unavailableIds);
      const available = results.filter((p) => !unavailable.has(p.id));
      setProducts(shuffle(available));
      setPage(1);
      if (available.length > 0) {
        const reviewSummaries = await getReviewSummaries(available.map((p) => p.id)).catch(() => []);
        setSummaries(Object.fromEntries(reviewSummaries.map((s) => [s.productId, s])));
      }
    };

    if (type === "category") {
      loadProducts({ categoryId: param });
      getAllCategories().then((categories) => {
        const match = categories.find((c) => String(c.id) === param);
        setPlaceLabel(match?.title || "");
      });
    } else if (type === "city") {
      loadProducts({ cityId: param });
      getAllCities().then((cities) => {
        const match = cities.find((c) => String(c.id) === param);
        setPlaceLabel(match ? `${match.city}, ${match.department}` : "");
      });
    } else {
      navigate("/NotFound");
    }
  }, [type, param, from, to, navigate]);

  const datesLabel = from && to ? ` — disponibles del ${from} al ${to}` : "";

  return (
    <div className="body">
      <SearchBar />
      <CategoryList />

      <div className="productListMainContainer" id="title">
        <div className="productListMainContainer__container">
          <h2>
            Resultados de la búsqueda {type === "category" ? `de ${placeLabel}` : `en ${placeLabel}`}
            {datesLabel}
          </h2>
          <div className="productListMainContainer__productList">
            {products.length === 0 && (
              <p>No hay propiedades disponibles con esos criterios. Probá con otras fechas u otro municipio.</p>
            )}
            {products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((p) => (
              <ProductCar
                key={p.id}
                id={p.id}
                title={p.title}
                category={p.category.title}
                image={p.coverImageUrl || p.category.imageUrl}
                location={p.address}
                avgRating={summaries[p.id]?.avgRating || 0}
                reviewCount={summaries[p.id]?.reviewCount || 0}
              />
            ))}
          </div>
          <Paginator
            totalItems={products.length}
            pageSize={PAGE_SIZE}
            currentPage={page}
            onPageChange={(nextPage) => {
              setPage(nextPage);
              document.getElementById("title")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
