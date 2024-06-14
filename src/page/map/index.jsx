import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Row } from "antd";
import { EnvironmentTwoTone } from '@ant-design/icons';
import styles from "../styles/map/style.module.css";
import Map from "../../components/Map";
import axios from "axios";
import { path } from "../../shared/config";

const MapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapData, setMapData] = useState([])

  const getAllMap = async() => {
    const {data} = await axios.get(`${path}/api/map/getAllMap`)
    setMapData(data?.data)
  
  }

  useEffect(() => {
    getAllMap()
  }, [])

  return (
    <div>
      <Navbar search={isModalOpen} setSearch={setIsModalOpen} />
      <div style={{ minHeight: "70vh", padding: "1.5rem 4rem" }}>
        <Row>
          <Col className={`gutter-row`} md={9}>
            <div>
              <h4>نزدیک ترین فروشگاه به من</h4>
              <div className={styles.titleLine}></div>
            </div>
            {mapData?.map((item,index)=>(
               <div key={index}>
               <div className={styles.titleBox}>
               <EnvironmentTwoTone twoToneColor="#F0E68C" className={styles.titleDot} /> 
                 <h4>{item?.title}:</h4>
               </div>
               <p className={styles.descBox}>{item?.description}</p>
             </div>
            ))}
           
         
          </Col>
          <Col className={`gutter-row w-full`} md={15}>
          <Map mapData={mapData} />
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default MapPage;
