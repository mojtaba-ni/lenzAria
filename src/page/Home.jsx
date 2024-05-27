import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar";
import { Col, Row, Card, Modal, Input } from "antd";
import { Pagination } from "swiper/modules";
import sliderImg from "../assets/images/newImg.jpg";
import lenzP1 from "../assets/images/lensNew.jpg";
import lenzP2 from "../assets/images/lenzNew2.jpg";
import lenzP3 from "../assets/images/lenzNew3.jpg";
import bannerImg from "../assets/images/slider1.jpg";
import bannerImgSec from "../assets/images/slider2.jpg";
import bannerPt from "../assets/images/slider3.jpg";
import bannerPtSec from "../assets/images/slider4.jpg";
import styles from "./styles/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { strings } from "../shared/language";
import Bestpart from "../components/Bestpart";
import Questions from "../components/Questions";
import Education from "../components/Education";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../shared/store/useSearch";

const Home = () => {

  const navigate = useNavigate()
  const {updateTitle} = useSearch()
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState(false);
  console.log({ isModalOpen });
  const [brand, setBrand] = useState();

  const handleOk = () => {
    updateTitle(search)
    setIsModalOpen(false);
    
    navigate("/search")
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearchTitle = () => {
    setSearch(search)
  };

  const geyAllBrand = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/brand/getAllBrand"
    );
    setBrand(data?.data);
  };
  useEffect(() => {
    geyAllBrand();
  }, []);

  return (
    <>
      <Modal
        title="عنوان محصول انتخابی خود را وارد کنید..."
        open={isModalOpen}
        onOk={handleOk}
        okText="تایید"
        onCancel={handleCancel}
        cancelText="لغو"
      >
        <Input
          placeholder="..."
          name="name"
          onChange={(e) => handleSearchTitle(e)}
        />
      </Modal>
      <div>
        <Navbar search={isModalOpen} setSearch={setIsModalOpen} />

        <Swiper
          pagination={true}
          modules={[Pagination]}
          className={styles.swiper}
        >
          <SwiperSlide>
            <img className={styles.sliderImg} src={sliderImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className={styles.sliderImg} src={sliderImg} alt="" />
          </SwiperSlide>
        </Swiper>

        <div className={styles.lenzBox}>
          <Row>
            <Col className={`gutter-row ${styles.rowCol} `} md={6}>
              <Card
                hoverable
                style={{
                  width: 300,
                  position: "relative",
                  padding: "0px !important",
                }}
                cover={<img alt="example" src={lenzP1} />}
              >
                <div className={styles.cardTitle}>sss</div>
              </Card>
            </Col>
            <Col className={`gutter-row ${styles.rowCol} `} md={6}>
              <Card
                hoverable
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={lenzP2} />}
              ></Card>
            </Col>{" "}
            <Col className={`gutter-row ${styles.rowCol} `} md={6}>
              <Card
                hoverable
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={lenzP3} />}
              ></Card>
            </Col>{" "}
            <Col className={`gutter-row ${styles.rowCol} `} md={6}>
              <Card
                hoverable
                style={{
                  width: 280,
                }}
                cover={<img alt="example" src={lenzP3} />}
              ></Card>
            </Col>
          </Row>
          <Bestpart title={strings.landing.bestSellers} />
        </div>
        <Row className={styles.bannerBox}>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerImg} alt="offer" />
          </Col>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerImgSec} alt="offer" />
          </Col>
        </Row>
        <Bestpart title={strings.landing.bestSellers} />
        <div
          style={{
            backgroundColor: "#e3e3e3",
            minHeight: "120px",
            margin: "3rem 0",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {brand?.map((item, index) => (
            <strong key={index}>{item?.name}</strong>
          ))}
        </div>
        <Row className={styles.bannerBox}>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerPt} alt="offer" />
          </Col>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerPtSec} alt="offer" />
          </Col>
        </Row>
        <Questions />
        <Education />
        <Footer />
      </div>
    </>
  );
};

export default Home;
