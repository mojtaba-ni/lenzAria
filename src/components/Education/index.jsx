/* eslint-disable react/prop-types */
import { strings } from "../../shared/language";
import imgEd from "../../assets/images/faceImg.jpg";
import { Button } from "antd";
import styles from "./education.module.css";
import { shortText } from "../../shared/utils";
import { useNavigate } from "react-router-dom";

const Education = () => {
  return (
    <div className={styles.educationPart}>
      <div>
        <h3>{strings.landing.educationCv}</h3>
        <div className={styles.titleLine}></div>
      </div>
      <div className={styles.educationWrapper}>
        <EducationCard />
        <EducationCard />
        <EducationCard />
        <EducationCard />
      </div>
    </div>
  );
};


export const EducationCard = ({ data ,direction }) => {
  const navigate = useNavigate()
  console.log({data});
  const handleBlogPage = (blogId) => {
    navigate(`/blog/${blogId}`)
  }
  return (
    <div
      className={direction ? styles.educationBoxDirection : styles.educationBox}
      onClick={()=>handleBlogPage(data?._id)}
    >
      <img src={imgEd} alt="education" />
      <div className={styles.descCard}> 
        <h4>{data && shortText(data?.blogTitle , 25) }</h4>
        <p>
          {data && shortText(data?.introduction , 100)}
        </p>
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
