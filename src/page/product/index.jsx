
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/product/getById?id=${id}`
    );
    setProduct(data?.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "60vh", padding: "1.5rem 2rem" , display:'flex' , flexDirection:'column' , gap:"2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <h4
            style={{
              minWidth: "100px",
              textAlign: "center",
              borderBottom: "3px solid #F0E68C",
            }}
          >
            {" "}
            {product?.name}
          </h4>
          <img src={product?.image} alt="cover" />
        </div>
        <div>
          <h3
            style={{
              width: "120px",
              display:"block",
              borderBottom: "3px solid #F0E68C",
            }}
          >
            توضیحات
          </h3>
          <p>{product?.description}</p>
        </div>
        <div>
          <h3
            style={{
              width: "170px",
              display:"block",
              borderBottom: "3px solid #F0E68C",
            }}
          >
            مشخصات فنی
          </h3>
          <p>{product?.Specifications}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
