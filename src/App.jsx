import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/signUp";
import Panel from "./page/panel";
import { ToastContainer } from "react-toastify";
import BlogUser from "./page/blog";
import SingleBlog from "./page/blog/singleBlog";
import Profile from "./page/profile";
import ProductPage from "./page/product";

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
          <Route path="/product" element={<ProductPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}
