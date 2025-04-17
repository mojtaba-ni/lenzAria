
import { Route, Routes,  } from "react-router-dom";
import { toast } from "react-toastify";
import AddBlog from "./add";
import BlogList from "./blogList";

const Blog = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/add" element={<AddBlog />} />
    
    </Routes>
  );
};
export default Blog;
