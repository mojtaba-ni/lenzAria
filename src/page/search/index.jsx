
import { Col, Row, Select } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Search = () => {
  const params = useParams();
  console.log({params});

  

  const [allProduct, setAllProduct] = useState();
  const [periodTitle, setPeriodtitle] = useState();

  const getProduct = async () => {
   
    const { data } = await axios.get(
      `http://localhost:8000/api/product/search?name=${params?.name}`
    );
    const product = data?.data;
    setPeriodtitle(data?.data[0].period)
    setAllProduct(product)
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh", padding: "1.5rem 2rem" }}>
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
            <h4>{periodTitle}</h4>
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

export default Search