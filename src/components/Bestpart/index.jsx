/* eslint-disable react/prop-types */

import styles from "./bestPart.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "../ProductCard";
import { Navigation } from "swiper/modules";
import { Col, Row, Skeleton } from "antd";

const Bestpart = ({ title, data }) => {
  const arrSkeleton = [0, 1, 2, 4];
  
  return (
    <div className={styles.bestSellerBox}>
      <div>
        <h5>{title}</h5>
        <div className={styles.titlecsd}></div>
      </div>
      <div className={styles.bestSellerSlider}>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
          style={{
            minHeight: "200px",
            "--swiper-button-next": { left: "-5px" },
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "16px",
            "--swiper-pagination-bullet-horizontal-gap": "10px",
          }}
        >
          {data?.length === 0 ? (
            <Row justify="space-evenly">
              {arrSkeleton.map((item, index) => (
                <Col
                style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}
                  key={index}
                  className={`gutter-row ${styles.rowCol} `}
                  md={6}
                  >
                  <Skeleton.Input
                    style={{
                      marginBottom: ".5rem",
                      minHeight: "230px",
                      minWidth: "270px",
                    }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            data?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: " 0px !important",
                }}
              >
                <ProductCard productInfo={item} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Bestpart;
