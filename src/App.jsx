import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/signUp";
import Panel from "./page/panel";
import { ToastContainer } from "react-toastify";
import BlogUser from "./page/blog";
import SingleBlog from "./page/blog/singleBlog";
import Profile from "./page/profile";
import ProductPage from "./page/product";
import ProductList from "./page/product/productList";
import BrandList from "./page/product/brandList";
import PeriodList from "./page/product/periodList";
import Search from "./page/search";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/panel/*" element={<Panel />} />
          <Route path="/blog" element={<BlogUser />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/brands/:brandId" element={<BrandList />} />
          <Route path="/periods/:periodId" element={<PeriodList />} />
          <Route path="/search/:name" element={<Search />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}
