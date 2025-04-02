import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar";
import { Col, Row, Card, Modal, Input, Skeleton } from "antd";
import { Pagination } from "swiper/modules";
import sliderImg from "../assets/images/newImg.jpg";
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
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../shared/store/useSearch";
import useLocalStorage from "use-local-storage";
import { path } from "../shared/config";
import Model from "../components/model";

const Home = () => {
  const navigate = useNavigate();
  const { updateTitle } = useSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [brand, setBrand] = useState();
  const [section, setSection] = useState();
  const [prSection, setPrSection] = useState();
  const [newPr, setNewPr] = useState([]);
  const [sectionLoading, setSectionLoading] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const arrSkeleton = [0, 1, 2, 3];

  const handleOk = () => {
    updateTitle(search);
    setIsModalOpen(false);

    navigate("/search");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearchTitle = () => {
    setSearch(search);
  };
  const getNewProduct = async () => {
    const { data } = await axios.get(`${path}/api/product/getNewProduct`);
    setNewPr(data?.data);
  };

  const getAllPrSection = async () => {
    const { data } = await axios.get(`${path}/api/productSection/getAll`);
    setPrSection(data?.data);
  };

  const getAllSection = async () => {
    setSectionLoading(true);
    const { data } = await axios.get(`${path}/api/section/getAll`);
    setSection(data?.data);
    setSectionLoading(false);
  };
  const geyAllBrand = async () => {
    const { data } = await axios.get(`${path}/api/brand/getAllBrand`);
    setBrand(data?.data);
  };
  console.log(geyAllBrand)
  useEffect(() => {
    geyAllBrand();
    getAllSection();
    getNewProduct();
    getAllPrSection();
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

        <div
          className={theme === "light" ? styles.lenzBox : styles.lenzBoxDark}
        >
          <Row justify="space-evenly">
            {sectionLoading
              ? arrSkeleton?.map((item, index) => (
                  <Col
                    className={`gutter-row ${styles.rowCol} `}
                    md={6}
                    key={index}
                  >
                    <Skeleton.Input
                      style={{
                        marginBottom: ".5rem",
                        minHeight: "230px",
                        minWidth: "250px",
                      }}
                    />
                  </Col>
                ))
              : section?.map((item, index) => (
                  <Col
                    className={`gutter-row ${styles.rowCol} `}
                    md={6}
                    key={index}
                  >
                    <Link to={`/products/${item?.step?.id}`}>
                      <Card
                        hoverable
                        style={{
                          width: 300,
                          position: "relative !important",
                          padding: "0px !important",
                        }}
                      >
                        <img
                          alt="example"
                          src={item?.image}
                          style={{ width: "100%" }}
                        />
                        <div className={styles.cardTitle}>{item?.title}</div>
                      </Card>
                    </Link>
                  </Col>
                ))}
          </Row>
          <Bestpart title={strings.landing.newSellers} data={newPr} />
        </div>
        <Row className={styles.bannerBox}>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerImg} alt="offer" />
          </Col>
          <Col sm={24} md={12} className={styles.bannerCol}>
            <img src={bannerImgSec} alt="offer" />
          </Col>
        </Row>
        <Bestpart title={strings.landing.bestSellers} data={newPr} />
        <div
          style={{
            backgroundColor: "#6fb5be69",
            minHeight: "120px",
            margin: "3rem 0",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {brand?.map((item, index) => (
            <strong style={{fontSize:"1.2rem"}} key={index}>{item?.name}</strong>
          ))}
        </div>
        <Row className={styles.bannerBox}>
          {prSection?.map((item, index) => (
            <Col sm={24} md={12} className={styles.bannerCol} key={index}>
              <Link to={`/products/${item?.step?.id}`}>
                <Card hoverable>
                  <img src={item?.image} alt="offer" />
                  <div className={styles.cardTitle}>{item?.title}</div>
                </Card>
              </Link>
            </Col>
          ))}

          {/* <Col sm={24} md={12} className={styles.bannerCol}>
            <Card hoverable>
              <img src={bannerPtSec} alt="offer" />
              <div className={styles.cardTitle}>لنز عسلی</div>
            </Card>
          </Col> */}
        </Row>
        <Questions />
        <Model />
        <Education />
        <Footer />
      </div>
    </>
  );
};

export default Home;
