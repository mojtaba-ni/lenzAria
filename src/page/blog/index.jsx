import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import style from "../styles/blog/blogStyle.module.css";
import { EducationCard } from "../../components/Education";
import { Col, Row } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const BlogUser = () => {
    const [blogsData, setBlogsData] = useState()

    const getAllBlogs = async() => {
        const {data} = await axios.get("http://localhost:8000/api/blog/getAllBlogs")
        if(!data?.isSuccess){
            toast.error(data?.message)
        }
        setBlogsData(data?.data)
    }

    useEffect(() => {
        getAllBlogs()
    }, [])
    
  return (
    <div>
      <Navbar />
      <div className={style.blogWrapper}>
        <div className={style.blogHeader}>
            <h2>بلاگ</h2>
        </div>
        <Row  justify="space-evenly">
            {blogsData?.map((item,index) => (
                <Col xs={24} sm={12} md={4} key={index}>
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
