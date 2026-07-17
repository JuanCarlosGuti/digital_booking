import React, { useEffect, useRef, useState } from "react";
import "./ProductListStyle.scss";
import { getAllProducts, getReviewSummaries } from "../../../services/fetchService";
import shuffle from "../../../services/shuffleService";

import ProductCar from "../../../containers/Body/ProductCar";
import Paginator from "../../Paginator";

const PAGE_SIZE = 8;

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  useEffect(() => {
    getAllProducts().then(async (res) => {
      setProducts(shuffle([...res]));
      // Una sola llamada batch para las estrellas de todas las tarjetas (sin N+1).
      if (res.length > 0) {
        const reviewSummaries = await getReviewSummaries(res.map((p) => p.id)).catch(() => []);
        setSummaries(Object.fromEntries(reviewSummaries.map((s) => [s.productId, s])));
      }
    });
  }, []);

  const changePage = (nextPage) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (products === null) {
    return (
      <div className="productListMainContainer">
        <div className="productListMainContainer__container">
          <h2> Cargando las Recomendaciones ...</h2>
        </div>
      </div>
    );
  }

  const pageItems = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="productListMainContainer">
      <div className="productListMainContainer__container" ref={listRef}>
        <h2> Recomendaciones</h2>
        <div className="productListMainContainer__productList">
          {pageItems.map((p) => (
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
        <Paginator totalItems={products.length} pageSize={PAGE_SIZE} currentPage={page} onPageChange={changePage} />
      </div>
    </div>
  );
};
export default ProductList;
