import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Divider, Row, Col, Input, Button } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import style from "../styles/order/style.module.css";
import { useOrder } from "../../shared/store/useOrder";
import { useEffect, useState } from "react";

const Order = () => {
  const { orderList } = useOrder();
  const [price, setPrice] = useState()
  console.log({ orderList });

  const sumOrderPrice = () => {
    let price = 0
    orderList.forEach(element => {
      price = price + element?.price
    });
    setPrice(price)
  }

  useEffect(() => {
    sumOrderPrice()
  }, [orderList])
  

  return (
    <div>
      <Navbar />
      <div className={style.orderBox}>
        <h4>سبد خرید</h4>
        <div className={style.orderMain}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Row
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Col md={6}>نام محصول</Col>
              <Col>تعداد</Col>
              <Col md={6}>قیمت</Col>
              <Col md={6}>حذف</Col>
            </Row>
            <Divider />
            {orderList?.map((item, index) => (
              <Row
                key={index}
                style={{
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  textAlign: "center",
                  width: "100%",
                  margin: ".8rem 0",
                }}
              >
                <Col md={6}>{item?.name}</Col>
                <Col
                  md={6}
                  style={{
                    maxWidth: "25px",
                    border: "1px solid gray",
                    textAlign: "center",
                  }}
                >
                  {item?.count}
                </Col>
                <Col md={6}>{item?.price} تومان</Col>
                <Col md={6}>
                  <CloseCircleTwoTone
                    twoToneColor="red"
                    style={{ fontSize: "1.3rem", cursor: "pointer" }}
                  />
                </Col>
              </Row>
            ))}

         
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <h6 style={{ fontWeight: "600" }}>جمع مبلغ خرید : </h6>
                <h6 style={{ fontWeight: "600" }}>{price} تومان</h6>
              </div>
              <Input
                placeholder="کد تخفیف"
                name="title"
                onChange={(e) => handleTitle(e)}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <h6 style={{ fontWeight: "600" }}>جمع مبلغ خرید : </h6>
                <h6 style={{ fontWeight: "600" }}>{price} تومان</h6>
              </div>
              <Button
                type="primary"
                size="large"
                style={{ width: "100px", fontSize: "1.1rem" }}
                htmlType="submit"
              >
                پرداخت
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;