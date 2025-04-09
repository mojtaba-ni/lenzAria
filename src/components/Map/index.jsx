

// START: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { memo} from "react";
import "leaflet/dist/leaflet.css";


// END: Preserve spaces to avoid auto-sorting
// import { LeafIconMain} from "@/config/map";


// eslint-disable-next-line react/prop-types
function Map({mapData}) {
 
    const map_access_token = "c3bfa5dea4867458588a71cf3a827717d0282ae5"
 
    

  return (
    <MapContainer
      className="w-full h-[300px] lg:h-[700px] z-10 leaflet-map"
      style={{width:"100%" , height:"500px"}}
      preferCanvas={true}
      center={{lat: 35.69611100,
        lng: 51.42305600}}
      zoom={10}
      scrollWheelZoom={true}
    >
      {/* <CentererLocation center={centerMap} /> */}
      <TileLayer
        attribution='&copy; <a href="https://kohanamlak.com">kohanamlak</a> contributors'
        url={`https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=${map_access_token}`}
      />
      <MarkerClusterGroup chunkedLoading>
        {mapData?.map((marker , index) => {
          if (marker.latitude && marker.longitude)
            return (
              <Marker
                key={index}
                position={[marker.latitude, marker.longitude]}
               
              >
                {/* <Popup >
                
                  <div
                    className="text-gray-600 hover:text-blue"
                  
                  >
                    {marker?.title}
                  </div>
                  <div >
                    <div className="flex gap-1">
                      <span>مساحت</span>
                      {marker.area} متر
                    </div>
                  </div>
                </Popup> */}
              </Marker>
            );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default memo(Map);