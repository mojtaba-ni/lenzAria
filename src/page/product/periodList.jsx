import { Col, Row, Select, Skeleton } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { path } from "../../shared/config";

const PeriodList = () => {
  const {periodId} = useParams();

  const [allProduct, setAllProduct] = useState();
  const [periodTitle, setPeriodtitle] = useState();
  const [loading, setLoading] = useState(false);

  const SkeletonArr = [0, 1, 2, 3];

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${path}/api/product/getProductByPeriodId?periodId=${periodId}`
    );
    const product = data?.data;

    setPeriodtitle(data?.data[0].period);
    setAllProduct(product);
    setLoading(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getProduct();
  }, [periodId]);

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
           
            {loading ? (
              <Skeleton.Input style={{ marginBottom: ".5rem" }} />
            ) : (
              <h4 style={{ marginBottom: ".5rem" }}>{periodTitle}</h4>
            )}
          </div>
        </div>
        <Row style={{ margin: "2rem 0 " }}>
          {loading
            ? SkeletonArr.map((item, index) => (
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
                  <Skeleton.Input active style={{ width: "260px" , height:"200px"}} />
                </Col>
              ))
            : allProduct !== undefined ? (allProduct?.map((item, index) => (
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
                  productInfo={item}
                   
                  />
                </Link>
              </Col>
            ))) : <div>
              محصولی یافت نشد
            </div> }  
        </Row>
      </div>
      <Footer />
    </div>
  );
};
export default PeriodList;
