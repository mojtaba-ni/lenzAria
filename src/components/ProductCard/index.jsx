/* eslint-disable react/prop-types */
import boxImg from "../../assets/images/jabe.png"
import { Card } from "antd";
import styles from "./productCard.module.css"
import {
  StarFilled
} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { commaThousondSeperator } from "../../shared/utils";

const ProductCard = ({productInfo}) => {
  console.log({productInfo});
  return (
    <Link to={`/product/${productInfo?._id}`}>
     <Card className={styles.ProductContainer} hoverable>
        <img src={productInfo ? productInfo?.image :  boxImg} alt="jabe" className={styles.ProductImg} />
        <div className={styles.ProductCardDesc}>
        <h4>{productInfo?.name}</h4>
        <div className={styles.rateBox}>
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#F0DB23" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#e3e3e3" , fontSize:"1.2rem"}} />
        <StarFilled style={{color:"#e3e3e3" , fontSize:"1.2rem"}} />
        </div>
       
        <strong>{productInfo && commaThousondSeperator(productInfo?.price) + ` تومان` }</strong>
        
        </div>
       
    </Card>
    </Link>
   
  )
}

export default ProductCard