import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Divider } from "antd";
import Bestpart from "../../components/Bestpart";
import { strings } from "../../shared/language";
import { useOrder } from "../../shared/store/useOrder";
import { ShopOutlined, HeartOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import style from "../styles/product/style.module.css";
import { path } from "../../shared/config";
import { commaThousondSeperator } from "../../shared/utils";


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [newproduct, setNewProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [ShowPart, setShowPart] = useState(1);

  const { orderList, updateOrderList , updateOrderUser } = useOrder();
  let lastPr = []
  let allPr = JSON.parse(localStorage.getItem("favoritePr")) 
  

  const getProduct = async () => {
    const { data } = await axios.get(
      `${path}/api/product/getById?id=${id}`
    );
    setProduct(data?.data);
  };
  const getNewProduct = async () => {
    const { data } = await axios.get(
      `${path}/api/product/getnewProduct`
    );
    setNewProduct(data?.data);
  };

  const handleOrderSubmit = () => {
    setCount(count + 1);
    
    
    const data = {
      name: product?.name,
      price: count + 1 > 0 ? product?.price * (count + 1) : product?.price,
      count: count + 1,
    };

    const newOrder = orderList.filter(item => item.name !== product?.name ) 
    newOrder.push(data)
    updateOrderUser(newOrder);
  };

  const handleCancelOrder = () => {
    setCount(count - 1);
  };

  // const checkFavorite = () => {

  // }

  const handleFavoritePr = () => {
    
    lastPr = []
    if(!allPr){
     
      lastPr.push(product)
      localStorage.setItem("favoritePr" , JSON.stringify(product) )
    }else{
    
   
      localStorage.setItem("favoritePr" , JSON.stringify([allPr , product]) )
    }

   
  
  
  }

  useEffect(() => {
    getProduct();
  }, [id]);
  
  useEffect(() => {
    getNewProduct();
  }, []);
  return (
    <div>
      <Navbar />
      <div className={style.prContainer}>
        {/* <div
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
              lineHeight: "40px",
            }}
          >
            {" "}
            {product?.name}
          </h4>
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
          }}
        >
          {/* <Col xs={24} sm={12} md={12}>
              <div>
                <h3
                  style={{
                    width: "170px",
                    display: "block",
                    borderBottom: "3px solid #F0E68C",
                    textAlign: "center",
                  }}
                >
                  مشخصات فنی
                </h3>
                <p style={{ marginTop: "1.2rem", lineHeight: "30px" }}>
                  {product?.Specifications}
                </p>
              </div>
            </Col> */}
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "170px",
              }}
            >
              <img
                src={product?.image}
                alt="cover"
                style={{ width: "100%", maxWidth: "260px" }}
              />
              <div className={style.showCard}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "600" }}>نام محصول :</h6>
                  <strong style={{ fontSize: "16px" }}>{product?.name}</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "600" }}>
                    برند سازنده :
                  </h6>
                  <strong style={{ fontSize: "16px" }}>
                    {product?.brand?.title}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "600" }}>قیمت :</h6>
                  <strong style={{ fontSize: "16px" }}>
                  {product?.price && commaThousondSeperator(product?.price)} تومان
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "600" }}>امتیاز :</h6>
                  <div>
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#e3e3e3", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#e3e3e3", fontSize: "1.2rem" }}
                    />
                  </div>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.8rem",
                    position: "relative",
                    minWidth: "175px",
                  }}
                >
                  <Button type="primary" danger onClick={handleOrderSubmit}>
                    افزودن به سبد خرید
                  </Button>
                  {count > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <strong
                        style={{
                          lineHeight: "20px",
                          borderBottom: "2px solid red",
                          minWidth: "15px",
                          textAlign: "center",
                        }}
                      >
                        {count}
                      </strong>
                      <CloseCircleTwoTone
                        twoToneColor="red"
                        style={{ cursor: "pointer" }}
                        onClick={handleCancelOrder}
                      />
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </Card>

          <div
            style={{
              display: "flex",
              gap: "2.2rem",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#6fb5be69",
                minWidth: "160px",
                minHeight: "60px",
                display: "grid",
                placeItems: "center",
                fontSize: "1.4rem",
                fontWeight: 600,
              }}
            >
              {product?.brand?.title}
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}
            >
              <div style={{display:"flex" , gap:".3rem"}}>
                <ShopOutlined
                  className={count > 0  ? style.shopIcActive  : style.shopIc}
                  onClick={handleOrderSubmit}
                />
                {count > 0 && <strong style={{color:"red"}}>{count}</strong>}
              </div>

              <HeartOutlined
                style={{ cursor: "pointer", fontSize: "1.7rem" }}
                onClick={handleFavoritePr}
              />
            </div>
          </div>
        </div>
        <Divider />

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 3rem",
            }}
          >
            <h5
              className={ShowPart == "1" ? style.activePart : style.part}
              onClick={() => setShowPart(1)}
            >
              مشخصات فنی
            </h5>
            <h5
              className={ShowPart == "2" ? style.activePart : style.part}
              onClick={() => setShowPart(2)}
            >
              توضیحات
            </h5>
            <h5
              className={ShowPart == "3" ? style.activePart : style.part}
              onClick={() => setShowPart(3)}
            >
              نظرات
            </h5>
          </div>
          <div style={{ margin: "15px 50px", minHeight: "250px" }}>
            {/* <h3
              style={{
                width: "120px",
                display: "block",
                borderBottom: "3px solid #F0E68C",
                textAlign: "center",
              }}
            >
              
            </h3> */}
            <p style={{ marginTop: "1.2rem", lineHeight: "30px" }}>
              {ShowPart == "1"
                ? product?.Specifications
                : ShowPart == "2"
                ? product?.description
                : ""}
              {}
            </p>
          </div>
          <Divider />
          <Bestpart title={strings.landing.samePr} data={newproduct} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
