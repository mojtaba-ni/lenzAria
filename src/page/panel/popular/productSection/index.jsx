
import { Route, Routes } from "react-router-dom";
import PrSectionList from "./prSectionList";
import AddPrSection from "./add";

const PopularPrSection = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrSectionList />} />
        <Route path="/add" element={<AddPrSection />} />
       
      </Routes>
    </div>
  );
};

export default PopularPrSection;
