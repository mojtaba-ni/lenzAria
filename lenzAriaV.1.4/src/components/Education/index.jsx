/* eslint-disable react/prop-types */
import { strings } from "../../shared/language";
import imgEd from "../../assets/images/faceImg.jpg";
import { Button, Col,Skeleton } from "antd";
import styles from "./education.module.css";
import { shortText } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../../shared/config";

const Education = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const arrSkeleton = [0, 1, 2, 4];

  const getAllblog = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${path}/api/blog/getAllBlogs`
    );

    const listBlog = [];
    if (data?.data.length > 4) {
      for (
        let index = data?.data.length - 3;
        index <= data?.data.length;
        index++
      ) {
        const element = data?.data[index];
        listBlog.push(element);
      }
      setBlogs(listBlog);
      setLoading(false);
      return;
    }

    setBlogs(data?.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllblog();
  }, []);

  return (
    <div className={styles.educationPart}>
      <div>
        <h5>{strings.landing.educationCv}</h5>
        <div className={styles.titleLine}></div>
      </div>
      <div className={styles.educationWrapper}>
        <>
          {loading ? (
            
              arrSkeleton.map((item, index) => (
                <Col md={12} key={index}>
                  <Skeleton.Input
                    style={{
                      marginBottom: ".5rem",
                      minHeight: "220px",
                      minWidth: "370px",
                    }}
                  />
                </Col>
              ))
           
          ) : (
            blogs?.map((item, index) => (
              <EducationCard data={item} key={index} />
            ))
          )}
        </>
      </div>
    </div>
  );
};

export const EducationCard = ({ data, direction }) => {
  const navigate = useNavigate();
  const handleBlogPage = (blogId) => {
    navigate(`/blog/${blogId}`);
  };
  return (
    <div
      className={direction ? styles.educationBoxDirection : styles.educationBox}
      onClick={() => handleBlogPage(data?._id)}
    >
      <img src={imgEd} alt="education" />
      <div className={styles.descCard}>
        <h4>{data && shortText(data?.blogTitle, 25)}</h4>
        <p>{data && shortText(data?.introduction, 100)}</p>
        {!direction && (
          <div className={styles.educationBtnBox}>
            <Button type="link" className={styles.educationBtn}>
              {strings.educationCard.continue}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
