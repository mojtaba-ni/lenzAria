import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import style from "../../styles/blog/blogStyle.module.css";
import { Card, Col, Row } from "antd";
import blogImg from "../../../assets/images/faceImg.jpg";
import { Link } from "react-router-dom";

const VideoBlogList = () => {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh", padding: "1.5rem 4rem" }}>
        <div className={style.blogHeader}>
          <h2>ویدیو بلاگ</h2>
        </div>
        <Row>
          <Col xs={24} sm={12} md={6}>
            <Link to={"/vblog"}>
              <Card hoverable className={style.educationBox}>
                <div>
                  <img
                    src={blogImg}
                    alt="blogCard"
                    style={{ width: "100%", marginTop: "1rem" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".8rem",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <h4>عنوان :</h4>
                    <h5>آموزش مراقبت از لنز</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <h4>مدت زمان :</h4>
                    <h5>1:30</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: ".2rem",
                    }}
                  >
                    <h4>تاریخ انتشار :</h4>
                    <h5>1402/11/30</h5>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Link > 
              <Card hoverable className={style.educationBox}>
                <div>
                  <img
                    src={blogImg}
                    alt="blogCard"
                    style={{ width: "100%", marginTop: "1rem" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".8rem",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <h4>عنوان :</h4>
                    <h5>آموزش مراقبت از لنز</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <h4>مدت زمان :</h4>
                    <h5>1:30</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: ".2rem",
                    }}
                  >
                    <h4>تاریخ انتشار :</h4>
                    <h5>1402/11/30</h5>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default VideoBlogList;
