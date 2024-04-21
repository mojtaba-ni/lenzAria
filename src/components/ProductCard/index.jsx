/* eslint-disable react/prop-types */
import React from 'react'
import boxImg from "../../assets/images/jabe.png"
import { Card } from "antd";
import styles from "./productCard.module.css"
import {
  StarFilled
} from "@ant-design/icons";


const ProductCard = ({data}) => {
  return (
    <Card className={styles.ProductContainer} hoverable>
        <img src={data ? data?.image :  boxImg} alt="jabe" className={styles.ProductImg} />
        <div className={styles.ProductCardDesc}>
        <h4>{data ? data?.name : "لنز طبی جانسون اکیو ویو اویسس"}</h4>
        <div className={styles.rateBox}>
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#e3e3e3" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#e3e3e3" , fontSize:"1.2rem"}} />
        </div>
       
        <strong>{data ? `${data?.price} تومان` : "485000 تومان"}</strong>
        </div>
       
    </Card>
  )
}

export default ProductCard