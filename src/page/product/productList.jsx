import { Col, Row, Select } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const params = useParams();
  const [allProduct, setAllProduct] = useState();
  const [title, setTitle] = useState();
  const getProduct = async () => {
    const { data } = await axios.get("http://localhost:8000/api/product");
    const product = data?.data;
    const categoryPr = product.filter((item) => item.category.id === params.id);
    const stepPr = product.filter((item) => item.step.id === params.id);
    if (categoryPr.length > 0) {
      setAllProduct(categoryPr);
      setTitle(categoryPr[0]?.category?.title);
    } else {
      setAllProduct(stepPr);
      setTitle(stepPr[0]?.step?.title);
       
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "60vh", padding: "1.5rem 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderBottom: "2px solid gray",
            }}
          >
            <p>مرتب سازی براساس</p>
            <Select
              defaultValue="jack"
              variant="borderless"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Yiminghe",
                  label: "قیمت",
                },
                {
                  value: "Yiminghe",
                  label: "امتیاز",
                },

                {
                  value: "lucy",
                  label: "پرفروش ترین ها",
                },
                {
                  value: "jack",
                  label: "جدید ترین ها",
                },
              ]}
            />
          </div>
          <div
            style={{
              minWidth: "100px",
              textAlign: "center",
              borderBottom: "3px solid #F0E68C",
            }}
          >
            <h4>{title}</h4>
          </div>
        </div>
        <Row style={{ margin: "2rem 0 " }}>
          {allProduct?.map((item, index) => (
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
                <ProductCard
                  data={{
                    image: item?.image,
                    Specifications: item?.Specifications,
                    description: item?.description,
                    name: item?.name,
                    price: item?.price,
                  }}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;