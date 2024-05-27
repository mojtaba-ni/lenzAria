import { useEffect, useState } from "react";
import { strings } from "../../shared/language";
import styles from "./questions.module.css"
import axios from "axios";

const Questions = () => {

  //State
  const [questionData, setQuestionData] = useState()

  //Func
  const getAllQuestion = async() => {
    const res = await axios.get("http://localhost:8000/api/question/getAllQuestion")
  }
  
  //Effect
  useEffect(() => {
    getAllQuestion()
  }, [])
  
  

  return (
    <div className={styles.questionsWrapper}>
      <div>
        <h3>{strings.landing.questions}</h3>
        <div className={styles.titleLine}></div>
      </div>
      <ul className={styles.questionTitle}>
        <li>لنز های طبی براساس دوره مصرف</li>
        <li>لنز های طبی براساس دوره مصرف</li>
        <li>لنز های طبی براساس دوره مصرف</li>
        <li>لنز های طبی براساس دوره مصرف</li>
        <li>لنز های طبی براساس دوره مصرف</li>
      </ul>
      <div>
        ssss  
      </div>
    </div>
  );
};

export default Questions;
