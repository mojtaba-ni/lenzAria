
import { Route, Routes } from "react-router-dom";
import MapList from "./mapList";
import AddMap from "./addMap";

const MapPanel = () => {
  return (
    <Routes>
      <Route path="/" element={<MapList />} />
      <Route path="/add" element={<AddMap />} />
    </Routes>
  );
};

export default MapPanel;
