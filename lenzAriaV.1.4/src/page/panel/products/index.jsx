import { Route, Routes } from "react-router-dom";
import ProductList from "./productList";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";

const Product = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default Product;
