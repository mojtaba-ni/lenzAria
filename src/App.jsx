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
import useLocalStorage from 'use-local-storage'
import "./index.css"
import Map from "./page/map";
import MapPage from "./page/map";
import VideoBlogList from "./page/blog/video";
import VBlogSingle from "./page/blog/video/vBlogSingle";
import Order from "./page/order";
import LenzTest from "./page/lenzTest";
import FavoritePage from "./page/favorite";


export default function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

const switchTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light'
  setTheme(newTheme )
}

console.log({meta: import.meta})

  return (
    <div data-theme={theme} className="app"> 
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
          <Route path="/vlog" element={<VideoBlogList />} />
          <Route path="/vlog/:id" element={<VBlogSingle />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/lenzTest" element={<LenzTest />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}
