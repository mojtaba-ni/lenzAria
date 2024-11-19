import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Divider, Skeleton } from "antd";
import Bestpart from "../../components/Bestpart";
import { strings } from "../../shared/language";
import { useOrder } from "../../shared/store/useOrder";
import { ShopOutlined, HeartOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import style from "../styles/product/style.module.css";
import { path } from "../../shared/config";
import { commaThousondSeperator } from "../../shared/utils";
import Comments from "../../components/Comments";
import boxImg from "../../assets/images/jabe.png";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [newproduct, setNewProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [ShowPart, setShowPart] = useState(1);
  const [showActiveFav, setShowActiveFav] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { orderList, updateOrderUser } = useOrder();
  let lastPr = [];
  let allPr = JSON.parse(localStorage.getItem("favoritePr"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log({ userData });

  const getProduct = async () => {
    const { data } = await axios.get(`${path}/api/product/getById?id=${id}`);
    setProduct(data?.data);
  };
  const getNewProduct = async () => {
    const { data } = await axios.get(`${path}/api/product/getnewProduct`);
    setNewProduct(data?.data);
  };

  const handleOrderSubmit = () => {
    setCount(count + 1);

    const data = {
      name: product?.name,
      price: count + 1 > 0 ? product?.price * (count + 1) : product?.price,
      count: count + 1,
    };

    const newOrder = orderList.filter((item) => item.name !== product?.name);
    newOrder.push(data);
    updateOrderUser(newOrder);
  };

  // const handleCancelOrder = () => {
  //   setCount(count - 1);
  // };

  // const checkFavorite = () => {

  // }

  const handleFavoritePr = () => {
    if (!userData) {
      navigate("/login");
    }

    lastPr = [];
    if (!allPr) {
      // lastPr.push(product);
      localStorage.setItem("favoritePr", JSON.stringify([product]));
      setShowActiveFav(true);
    } else {
      const existPr = allPr.find((item) => item?._id == product?._id);
      if (existPr) {
        const allWithoutDuplicate = allPr.filter(
          (item) => item?._id !== product?._id
        );
        localStorage.setItem("favoritePr", JSON.stringify(allWithoutDuplicate));
        setShowActiveFav(false);
        return;
      }
      lastPr = allPr;
      lastPr.push(product);
      localStorage.setItem("favoritePr", JSON.stringify(lastPr));
      setShowActiveFav(true);
    }
  };

  const checkFav = () => {
    const allPr = JSON.parse(localStorage.getItem("favoritePr"));
    if (allPr) {
      const existPr = allPr.find((item) => item?._id == id);
      if (existPr) {
        setShowActiveFav(true);
      }
    }
  };

  useEffect(() => {
    getProduct();
    checkFav();
  }, [id]);

  useEffect(() => {
    getNewProduct();
  }, []);
  return (
    <div>
      <Navbar />
      <>
        <div className={style.prContainer}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem",
            }}
          >
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: "170px",
                }}
              >
                {product ? (
                  <img
                    src={product ? product?.image : boxImg}
                    alt="cover"
                    className={style.prImage}
                    onClick={handleImageClick}
                  />
                ) : (
                  <Skeleton.Input
                    className={style.skeletImg}
                    style={{ height: "140px", width: "260px" }}
                  />
                )}

                <div className={style.showCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <h6 style={{ margin: 0, fontWeight: "600" }}>
                      نام محصول :
                    </h6>
                    <strong style={{ fontSize: "16px" }}>
                      {product?.name}
                    </strong>
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
                      {product?.price && commaThousondSeperator(product?.price)}{" "}
                      تومان
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
                <div style={{ display: "flex", gap: ".3rem" }}>
                  <ShopOutlined
                    className={count > 0 ? style.shopIcActive : style.shopIc}
                    onClick={handleOrderSubmit}
                  />
                  {count > 0 && (
                    <strong style={{ color: "red" }}>{count}</strong>
                  )}
                </div>

                <HeartOutlined
                  className={showActiveFav ? style.favIcActive : style.favIc}
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
            <div style={{ margin: "30px 50px", minHeight: "250px" }}>
              <p style={{ lineHeight: "36px" }}>
                {ShowPart == "1" ? (
                  product?.Specifications
                ) : ShowPart == "2" ? (
                  product?.description
                ) : (
                  <Comments productId={id} username={userData?.username} />
                )}
                {}
              </p>
            </div>
            <Divider />
            <Bestpart title={strings.landing.samePr} data={newproduct} />
          </div>
        </div>
        {isModalVisible && ( // Modal for zoomed image
          <div className={style.modal} onClick={handleCloseModal}>
            <img
              src={product ? product?.image : boxImg}
              alt="Zoomed product"
              className={style.zoomedImage}
            />
          </div>
        )}
      </>

      <Footer />
    </div>
  );
};

export default ProductPage;
