import React from "react";
import { strings } from "../../shared/language";
import styles from "./questions.module.css"

const Questions = () => {
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
    </div>
  );
};

export default Questions;
