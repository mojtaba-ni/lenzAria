
import { Route, Routes } from "react-router-dom";
import SectionList from "./sectionList";
import AddSection from "./add";
const PopularSection = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SectionList />} />
        <Route path="/add" element={<AddSection />} />
       
      </Routes>
    </div>
  );
};

export default PopularSection;
