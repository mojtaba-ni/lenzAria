import  { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axios from 'axios';
import { path } from '../../shared/config';

const Model = () => {
  const [modelData, setModelData] = useState()

  const getAllModel = async() => {
    const {data} = await axios.get(`${path}/api/modelBanner/all`)
    if(data?.isSuccess){
      setModelData(data?.data)
    }
    
  }

  useEffect(() => {
    getAllModel()
  }, [])
  

  return (
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{padding:"0 2rem" , paddingBottom:'1rem'}}
      >
        {modelData?.map((item,index) => 
         <SwiperSlide key={index}>
          <img src={item?.image} alt="modelImg" width={270} />
         </SwiperSlide>
        )}
       
       
      </Swiper>
  )
}

export default Model