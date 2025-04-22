import { Route, Routes } from "react-router-dom"
import AddCategory from "./add"
import CategoryList from "./categoryList"
import EditCategory from "./edit"


const Category = () => {
  return (
    <div>
           <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/add" element={<AddCategory />} />
            <Route path="/edit/:id" element={<EditCategory />} />
          </Routes>
    </div>
  )
}

export default Category