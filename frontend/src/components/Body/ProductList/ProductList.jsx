import React, { useEffect, useState } from "react";
import "./ProductListStyle.scss";
import { getAllProducts } from "../../../services/fetchService";
import shuffle from "../../../services/shuffleService";

import ProductCar from "../../../containers/Body/ProductCar";

import imagesBucketUrl from "../../../data/imagesBucket";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      getAllProducts().then((res) => {
        shuffle(res);
        setProducts(res);
        setReady(true);
      });
    }
  }, [ready]);

  if (!ready) {
    return (
      <div className="productListMainContainer">
      <div className="productListMainContainer__container">
        <h2> Cargando las Recomendaciones ...</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="productListMainContainer">
      <div className="productListMainContainer__container">
        <h2> Recomendaciones</h2>
        <div className="productListMainContainer__productList">
          {products.map((p) => (
            <ProductCar
              key={p.id}
              id={p.id}
              name={p.name}
              title={p.title}
              category={p.category.title}
              image={p.images.length >  0 ?p.images[0].url :p.category.imageUrl}
              location={p.address}
              description={p.description}
            />
          ))}
        </div>
        </div>
      </div>
    );
  }
};
export default ProductList;
