import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [favPr, setFavPr] = useState();
  console.log({ favPr });

  useEffect(() => {
    const product = localStorage.getItem("favoritePr");
   
    setFavPr([JSON.parse(product)]);
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh", padding: "1.5rem 4rem" }}>
        <Row style={{ margin: "2rem 0 " }}>
          {favPr?.map((item, index) => (
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
              <Link to={`/product/${item?._id}`}>
                <ProductCard productInfo={item} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritePage;
