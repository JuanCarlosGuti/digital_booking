import "./Body.scss";
import SearchBar from "./SearchBar/SearchBar";
import CategoryList from "./CategoryList/CategoryList";
import ProductList from "./ProductList/ProductList";
import { useEffect } from "react";
export default function Body() {

  useEffect(()=>{
    localStorage.setItem("prevUrl", window.location.pathname);
  },[])
  
  return (
    <div className="body">
      <SearchBar />
      <CategoryList/>
      <ProductList/>
    </div>
  );
}
