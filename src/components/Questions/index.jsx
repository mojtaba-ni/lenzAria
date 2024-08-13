import { useEffect, useState } from "react";
import { strings } from "../../shared/language";
import styles from "./questions.module.css"
import axios from "axios";
import { Skeleton } from "antd";
import { path } from "../../shared/config";

const Questions = () => {

  //State
  const [questionData, setQuestionData] = useState([])
  const [activeQuestion, setActiveQuestion] = useState()
  const [loading, setLoading] = useState(false)

 

  //Func
  const getAllQuestion = async() => {
    setLoading(true)
    const {data} = await axios.get(`${path}/api/question/getAllQuestion`)
    setQuestionData(data?.data)
    setActiveQuestion(data?.data[0])
    setLoading(false)
  }

  const handleActiveQ = (index) => {
    setActiveQuestion(questionData[index])
  }
  
  //Effect
  useEffect(() => {
    getAllQuestion()
  }, [])
  
  

  return (
    <div className={styles.questionsWrapper}>
      <div className={styles.questionsHead}>
        <h5>{strings.landing.questions}</h5>
        <div className={styles.titleLine}></div>
      </div>
      <ul className={styles.questionTitle}>
        {loading ? (  
           <Skeleton.Input
           style={{
             margin: ".5rem 0",
             minHeight: "40px",
             width: "100%",
           }}
         />
        ) : (
          questionData?.map((item,index) => (
            <li key={index} onClick={() => handleActiveQ(index)}>{item?.title}</li>
          ))
        )}

        
        
        
        
      </ul>
      <div>
        
        <h5 style={{textAlign:"center" , marginTop:'1.5rem'}}>{activeQuestion?.title}</h5>  
        <p className={styles.questionDesc}>
          {activeQuestion?.description}
        </p>
      </div>
    </div>
  );
};

export default Questions;
