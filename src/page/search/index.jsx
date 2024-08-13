import { Col, Row, Select, Skeleton } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { path } from "../../shared/config";
import productNotFoundImg from "../../assets/images/productNotFound.svg";
import style from "../styles/panel.module.css"

const Search = () => {
  const params = useParams();

  const [allProduct, setAllProduct] = useState([]);
  const [periodTitle, setPeriodtitle] = useState();
  const [loading, setLoading] = useState(false);
 
  const SkeletonArr = [0, 1, 2, 3];

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${path}/api/product/search?name=${params?.name}`
    );
    const product = data?.data;

    setPeriodtitle(data?.data[0]?.period);
    setAllProduct(product ? product : []);
    setLoading(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getProduct();
  }, [params?.name]);

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
         {allProduct?.length > 0 && (
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
                  width: 140,
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
          )}
          <div
            style={{
              minWidth: "100px",
              textAlign: "center",
              borderBottom: allProduct?.length > 0 ? "3px solid #F0E68C" : "unset",
            }}
          >
            <h4 style={{paddingBottom:".4rem"}}>{params?.name}</h4>
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
            : allProduct?.length > 0 ? allProduct?.map((item, index) => (
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
              )) :   <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap:"2rem"
              }}
            >
              <img src={productNotFoundImg} width={400} height={400} style={{borderRadius:"25%"}} />
              <div
              className={style.notFoundTitle}
              >
                <h4>محصول مورد نظر یافت نشد</h4>
              </div>
            </div> }
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
