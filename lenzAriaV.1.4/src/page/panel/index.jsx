import { Col, Row, Card, Avatar } from "antd";
import {
  UserOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  EditOutlined,
  PictureOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { GoChecklist } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import style from "../styles/panel.module.css";
import { Routes, Route, Link } from "react-router-dom";
import AllUser from "./allUser";
import Blog from "./blog";
import Brand from "./brand";
import Product from "./products";
import { useState } from "react";
import MainBanner from "./baner/mainBanner";
import OfferBanner from "./baner/offerBanner";
import Category from "./category";
import ModelBanner from "./baner/modelBanner";
import Question from "./question";
import PopularSection from "./popular/section";
import PopularPrSection from "./popular/productSection";
import MapPanel from "./map";
import notFoundImg from "../../assets/images/notFound.jpg" 
import Comments from "./comments";

const Panel = () => {
  const [banerShow, setBanerShow] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
 
  return (
    <>
      {(!userData || userData?.role === "user") ? (
        <div    style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          minHeight:"100vh",
          gap:"2rem"
        }}>
          <img src={notFoundImg} loading="lazy" style={{borderRadius:"25%"}} alt="notFoundImg" width={400} height={400} />
          <div
                className={style.notFoundTitle}
              >
                <h4>صفحه مورد نظر یافت نشد</h4>
              </div>
        </div>
      ) : (
        <Row style={{ height: "100vh" }}>
          <Col span={5}>
            <div className={style.panelSide}>
              <div className={style.panelSideTitle}>
                <Avatar
                  size={55}
                  icon={<UserOutlined />}
                  className={style.panelSideIcon}
                />
                <h5 style={{ color: "#F0E68C" , fontSize: "1.1rem" }}>{userData?.username}</h5>
                <Link to={"/"} className={style.homeIC}>
                <HomeOutlined />
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <FiUsers style={{ fontSize: "1.4rem", color: "#F0E68C" }} />
                <Link to={"/panel/users"}>
                  <h5 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    لیست کاربران
                  </h5>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <EditOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/blog"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت بلاگ
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <GoChecklist style={{ fontSize: "1.4rem", color: "#F0E68C" }} />
                <Link to={"/panel/brand"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت برند
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <GoChecklist style={{ fontSize: "1.4rem", color: "#F0E68C" }} />
                <Link to={"/panel/category"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت دسته بندی
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <QuestionCircleOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/questions"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت سوالات متداول
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <ShopOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/product"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت محصولات
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <PictureOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />

                <h4
                  style={{ color: "#F0E68C", fontSize: "1.1rem" }}
                  onClick={() => setBanerShow(!banerShow)}
                >
                  مدیریت بنر
                </h4>
              </div>
              {banerShow && (
                <div className={style.panelBaner}>
                  <Link className={style.panelBanerLi} to={"./mainBanner"}>
                    <h6 style={{ color: "#F0E68C" }}>بنر اصلی</h6>
                  </Link>
                  <Link className={style.panelBanerLi} to={"./offerBanner"}>
                    <h6 style={{ color: "#F0E68C" }}>بنر پیشنهادات</h6>
                  </Link>
                  <Link className={style.panelBanerLi} to={"./modelBanner"}>
                    <h56 style={{ color: "#F0E68C" }}>بنر مدل</h56>
                  </Link>
                </div>
              )}
              <div className={style.panelSideLi}>
                <ShopOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/popularSection"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت لنزهای محبوب
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <ShopOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/popularProductSection"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت محصولات محبوب
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <MessageOutlined 
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/comments"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت نظرات
                  </h4>
                </Link>
              </div>
              <div className={style.panelSideLi}>
                <EnvironmentOutlined
                  style={{ fontSize: "1.4rem", color: "#F0E68C" }}
                />
                <Link to={"/panel/map"}>
                  <h4 style={{ color: "#F0E68C", fontSize: "1.1rem" }}>
                    مدیریت آدرس
                  </h4>
                </Link>
              </div>
            </div>
          </Col>
          <Col span={19} className={style.panelBox}>
            <Card
              bordered={false}
              style={{
                margin: "2rem",
                minHeight: "90vh",
                padding: "20px 25px",
              }}
            >
              <Routes>
                <Route path="users" element={<AllUser />} />
                <Route path="brand" element={<Brand />} />
                <Route path="blog/*" element={<Blog />} />
                <Route path="questions/*" element={<Question />} />
                <Route path="product/*" element={<Product />} />
                <Route path="mainBanner/*" element={<MainBanner />} />
                <Route path="offerBanner/*" element={<OfferBanner />} />
                <Route path="modelbanner/*" element={<ModelBanner />} />
                <Route path="category/*" element={<Category />} />
                <Route path="comments/*" element={<Comments />} />
                <Route path="popularSection/*" element={<PopularSection />} />
                <Route
                  path="popularProductSection/*"
                  element={<PopularPrSection />}
                />
                <Route path="map/*" element={<MapPanel />} />
              </Routes>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Panel;
