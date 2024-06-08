import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import style from "../styles/blog/blogStyle.module.css";
import axios from "axios";
import imgBl from "../../assets/images/faceImg2.jpg";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  const getBlogById = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/blog/getById?id=${id}`
    );
    if (!data.isSuccess) {
      return;
    }
    setBlog(data?.data);
  };

  useEffect(() => {
    getBlogById();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className={style.singleBlogWrapper}>
        <div>
          <h2>{blog?.blogTitle}</h2>
        </div>
        <p>{blog?.introduction}</p>
        <img
          src={imgBl}
          alt={blog?.blogTitle}
          className={style.singleBlogImg}
        />
        {blog?.detail?.length > 0 &&
        blog?.detail.map((item,index) => (
          <div key={index} className={style.singleBlogWrapper}>
            <div>
              <h2>{item?.headline}</h2>
            </div>
            <p>{item?.desc}</p>
            <img
              src={imgBl}
              alt={blog?.blogTitle}
              className={style.singleBlogImg}
            />
          </div>
        ))}
      </div>
      

      <Footer />
    </div>
  );
};

export default SingleBlog;
