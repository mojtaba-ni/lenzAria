import { useEffect, useState } from "react";
import { strings } from "../../shared/language";
import styles from "./questions.module.css";
import axios from "axios";
import { Skeleton } from "antd";
import { path } from "../../shared/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { shortText } from "../../shared/utils";

const Questions = () => {
  //State
  const [questionData, setQuestionData] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState();
  const [loading, setLoading] = useState(false);

  //Func
  const getAllQuestion = async () => {
    setLoading(true);
    const { data } = await axios.get(`${path}/api/question/getAllQuestion`);
    setQuestionData(data?.data);
    setActiveQuestion(data?.data[0]);
    setLoading(false);
  };

  const handleActiveQ = (index) => {
    setActiveQuestion(questionData[index]);
  };

  //Effect
  useEffect(() => {
    getAllQuestion();
  }, []);

  return (
    <div className={styles.questionsWrapper}>
      <div className={styles.questionsHead}>
        <h5>{strings.landing.questions}</h5>
        <div className={styles.titleLine}></div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Autoplay]}
        className={styles.questionTitle}
        style={{ width: "100%" }}
      >
        {loading ? (
          <Skeleton.Input
            style={{
              margin: ".5rem 0",
              minHeight: "40px",
              width: "100%",
            }}
          />
        ) : (
          questionData?.map((item, index) => (
            <SwiperSlide key={index} onClick={() => handleActiveQ(index)}>
              <div style={{ width: "300px", cursor: "pointer" }}>
                {shortText(item?.title, 100)}
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div>
        <h5 style={{ textAlign: "center", marginTop: "1.5rem" }}>
          {activeQuestion?.title}
        </h5>
        <p className={styles.questionDesc}>{activeQuestion?.description}</p>
      </div>
    </div>
  );
};

export default Questions;
