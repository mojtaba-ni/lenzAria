import { Col, Row, Card, Avatar } from "antd";
import {
  UserOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  EditOutlined,
  PictureOutlined,
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

const Panel = () => {
  const [banerShow, setBanerShow] = useState(false);

  return (
    <Row style={{ height: "100vh" }}>
      <Col span={5}>
        <div className={style.panelSide}>
          <div className={style.panelSideTitle}>
            <Avatar
              size={55}
              icon={<UserOutlined />}
              className={style.panelSideIcon}
            />
            <h4 style={{ color: "#F0E68C" }}>amir.moradi</h4>
          </div>
          <div className={style.panelSideLi}>
            <FiUsers style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/users"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                لیست کاربران
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <EditOutlined style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/blog"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت بلاگ
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <GoChecklist style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/brand"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت برند
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <GoChecklist style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/category"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت دسته بندی
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <QuestionCircleOutlined
              style={{ fontSize: "1.3rem", color: "#F0E68C" }}
            />
            <Link to={"/panel/questions"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت سوالات متداول
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <ShopOutlined style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/product"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت محصولات
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <PictureOutlined style={{ fontSize: "1.3rem", color: "#F0E68C" }} />

            <h4
              style={{ color: "#F0E68C", fontSize: "1.4rem" }}
              onClick={() => setBanerShow(!banerShow)}
            >
              مدیریت بنر
            </h4>
          </div>
          {banerShow && (
            <div className={style.panelBaner}>
              <Link className={style.panelBanerLi} to={"./mainBanner"}>
                <h5 style={{ color: "#F0E68C" }}>بنر اصلی</h5>
              </Link>
              <Link className={style.panelBanerLi} to={"./offerBanner"}>
                <h5 style={{ color: "#F0E68C" }}>بنر پیشنهادات</h5>
              </Link>
              <Link className={style.panelBanerLi} to={"./modelBanner"}>
                <h5 style={{ color: "#F0E68C" }}>بنر مدل</h5>
              </Link>
            </div>
          )}
          <div className={style.panelSideLi}>
            <ShopOutlined style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/popularSection"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت لنزهای محبوب
              </h4>
            </Link>
          </div>
          <div className={style.panelSideLi}>
            <ShopOutlined style={{ fontSize: "1.3rem", color: "#F0E68C" }} />
            <Link to={"/panel/popularProductSection"}>
              <h4 style={{ color: "#F0E68C", fontSize: "1.4rem" }}>
                مدیریت محصولات محبوب
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
            <Route path="popularSection/*" element={<PopularSection />} />
            <Route path="popularProductSection/*" element={<PopularPrSection />} />
          </Routes>
        </Card>
      </Col>
    </Row>
  );
};

export default Panel;
