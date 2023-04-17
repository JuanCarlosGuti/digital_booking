import React from "react";
import { useState, useEffect } from "react";
import CategoryCard from "../../../containers/Body/CategoryCard";
import "./CategoryListStyle.scss";
import { getAllCategory } from "../../../services/fetchService";
import imagesBucketUrl from "../../../data/imagesBucket";

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory().then((res) => {
      setCategories(res);
    });
  }, []);
  return (
    <section className="CategoriesContainer">
      <div className="CategoriesContainer__container">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="CategoriesContainer_listContainer">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.title}
              amount={cat.description}
              image={imagesBucketUrl + cat.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoryList;
