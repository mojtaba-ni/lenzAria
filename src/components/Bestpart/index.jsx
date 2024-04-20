/* eslint-disable react/prop-types */
import React from "react";
import styles from "./bestPart.module.css";
import { strings } from "../../shared/language";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import ProductCard from "../ProductCard";
import { Navigation } from 'swiper/modules';

const Bestpart = ({ title }) => {
  return (
    <div className={styles.bestSellerBox}>
      <div>
        <h4>{title}</h4>
        <div className={styles.titleLine}></div>
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
            minHeight:"240px",
            "--swiper-button-next": { left: "-5px" },
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "16px",
            "--swiper-pagination-bullet-horizontal-gap": "10px"
        }}
        >
          <SwiperSlide style={{display:"flex" , justifyContent:"center" , margin:" 0px !important"}}>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide style={{display:"flex" , justifyContent:"center" , margin:" 0px !important"}}>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide style={{display:"flex" , justifyContent:"center" , margin:" 0px !important"}}>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide style={{display:"flex" , justifyContent:"center" ,margin:" 0px !important"}}>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide style={{display:"flex" , justifyContent:"center" , margin:" 0px !important"}}>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Bestpart;
