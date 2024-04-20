import { Col, Row, Select } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

const ProductPage = () => {
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
            <h4>لنز طبی</h4>
          </div>
        </div>
        <Row style={{margin:"2rem 0 "}}>
          <Col
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
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 2,
            }}
            sm={{
              order: 1,
            }}
            md={{
              order: 4,
            }}
            lg={{
              order: 3,
            }}
          >
           <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 3,
            }}
            sm={{
              order: 4,
            }}
            md={{
              order: 2,
            }}
            lg={{
              order: 1,
            }}
          >
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 4,
            }}
            sm={{
              order: 3,
            }}
            md={{
              order: 1,
            }}
            lg={{
              order: 2,
            }}
          >
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 4,
            }}
            sm={{
              order: 3,
            }}
            md={{
              order: 1,
            }}
            lg={{
              order: 2,
            }}
          >
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 4,
            }}
            sm={{
              order: 3,
            }}
            md={{
              order: 1,
            }}
            lg={{
              order: 2,
            }}
          >
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 4,
            }}
            sm={{
              order: 3,
            }}
            md={{
              order: 1,
            }}
            lg={{
              order: 2,
            }}
          >
            <ProductCard />
          </Col>
          <Col
            span={6}
            xs={{
              order: 4,
            }}
            sm={{
              order: 3,
            }}
            md={{
              order: 1,
            }}
            lg={{
              order: 2,
            }}
          >
            <ProductCard />
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
