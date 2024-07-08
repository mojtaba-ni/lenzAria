import { Col, Row, Select, Skeleton } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/product/style.module.css";
import { path } from "../../shared/config";

const BrandList = () => {
  const params = useParams();
  const [allProduct, setAllProduct] = useState();
  const [brandTitle, setBrandTitle] = useState();
  const [loading, setLoading] = useState(false);

  const SkeletonArr = [0, 1, 2, 3];

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${path}/api/product/getProductByBrandId?brandId=${params.brandId}`
    );
    const product = data?.data;
    setBrandTitle(data?.data[0].brand?.title);
    setAllProduct(product);
    setLoading(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getProduct();
  }, [params?.brandId]);

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
              className={style.selectOp}
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
              <h4 style={{ marginBottom: ".5rem" }}>{brandTitle}</h4>
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
                  <Skeleton.Input
                    active
                    style={{ width: "260px", height: "200px" }}
                  />
                </Col>
              ))
            : allProduct?.map((item, index) => (
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
export default BrandList;
