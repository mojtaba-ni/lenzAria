import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import productNotFoundImg from "../../assets/images/productNotFound.svg";
import style from "../styles/product/style.module.css";

const FavoritePage = () => {
  const [favPr, setFavPr] = useState([]);

  useEffect(() => {
    const product = localStorage.getItem("favoritePr");
    if (product) {
      const favoritePr = JSON.parse(product);
      setFavPr(favoritePr);
    } else {
      setFavPr([]);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh", padding: "1.5rem 4rem" }}>
        <Row style={{ margin: "2rem 0 " }}>
          {favPr?.length > 0 && favPr[0] !== null ? (
            favPr?.map((item, index) => (
              <Col
                key={index}
                span={6}
                xs={{
                  order: 1,
                }}
                sm={{
                  order: 2,
                }}
                md={{
                  order: 3,
                }}
                lg={{
                  order: 4,
                }}
              >
                {item && (
                  <Link to={`/product/${item?._id}`}>
                    <ProductCard productInfo={item} />
                  </Link>
                )}
              </Col>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: "4rem",
              }}
            >
              <img
                src={productNotFoundImg}
                width={350}
                height={350}
                style={{ borderRadius: "25%" }}
              />
              <div className={style.notFoundTitle}>
                <h5>محصولی در این بخش یافت نشد</h5>
              </div>
            </div>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritePage;
