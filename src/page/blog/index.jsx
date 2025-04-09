import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import style from "../styles/blog/blogStyle.module.css";
import { EducationCard } from "../../components/Education";
import { Col, Row, Skeleton } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { path } from "../../shared/config";

const BlogUser = () => {
  const [blogsData, setBlogsData] = useState();
  const [loading, setLoading] = useState();

  const arrSkeleton = [0, 1, 2, 3];

  const getAllBlogs = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `${path}/api/blog/getAllBlogs`
    );
    if (!data?.isSuccess) {
      toast.error(data?.message);
    }
    setBlogsData(data?.data);
    setLoading(false)
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style.blogWrapper}>
        <div className={style.blogHeader}>
          <h2>بلاگ</h2>
        </div>
        <Row justify="space-evenly">
          {loading
            ? arrSkeleton.map((item, index) => (
                <Col xs={24} sm={12} md={6} key={index} style={{display:"flex !important" , justifyContent:"center" , alignItems:"center"}}>
                  <Skeleton.Input
                    style={{
                      marginBottom: ".5rem",
                      minHeight: "220px",
                      minWidth: "300px",
                    }}
                  />
                </Col>
              ))
            : blogsData?.map((item, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <EducationCard direction={true} data={item} />
                </Col>
              ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default BlogUser;
