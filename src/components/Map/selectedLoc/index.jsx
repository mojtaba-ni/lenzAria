import {  useState } from "react";
import L from "leaflet";
import cedarMaps from "@cedarstudios/cedarmaps";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Popover } from "antd";

export const LeafIcon = L.Icon.extend({
  options: {
    iconUrl: "/src/assets/images/logo.jpg",
    iconSize: [60, 60], // Adjust this size as needed
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
    
  },
});

const map_access_token = "c3bfa5dea4867458588a71cf3a827717d0282ae5";
export const getAddressOfLocationPoints = (lat, lng) => {
  const CedarMaps = cedarMaps(map_access_token);
  return CedarMaps.reverseGeocoding(
    [lat, lng],
    CedarMaps.Constants.INDEXES.STREET_INDEX,
    function (err, result) {
      if (err) {
        return console.error(err);
      }
      return result;
    }
  );
};

function SelectLocationOnMap({ handleLocationCoords }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState({});

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ lat, lng });
    getAddressOfLocationPoints(lat, lng).then((result) => {
      setSelectedLocationInfo(result);
      handleLocationCoords({ lat, lng, result });
    });
  };
  // const map = useMap();

  const handleMarkerDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    console.log("Marker dragged to: ", lat, lng); // Debug log
    getAddressOfLocationPoints(lat, lng).then((result) => {
      setSelectedLocationInfo(result);
      handleLocationCoords({ lat, lng, result });
      console.log("Updated location info: ", result); // Debug log
    });
    setSelectedLocation({ lat, lng });
  };

  // Custom hook to handle map events
  function MapClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  console.log("test", location);

  return (
    <MapContainer
      className="z-10 leaflet-map"
      center={{ lat: 35.696111, lng: 51.423056 }}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%" }}
    >
      {/* <CentererLocation center={location} /> */}
      <TileLayer
        attribution='&copy; <a href="https://kohanamlak.com">kohanamlak</a> contributors'
        url={`https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=${map_access_token}`}
      />
      <MapClickHandler />

      {/* Conditionally render marker for selected location */}
      {selectedLocation && (
        <Popover content={"Sssss"} title="Title" trigger="hover">
          <Marker
            icon={new LeafIcon()}
            position={selectedLocation}
            draggable={true}
            eventHandlers={{ dragend: handleMarkerDragEnd }}
          ></Marker>
        </Popover>
      )}
    </MapContainer>
  );
}

export default SelectLocationOnMap;
