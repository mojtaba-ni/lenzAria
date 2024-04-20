import React from "react";
import { strings } from "../../shared/language";
import styles from "./brands.module.css"

const Brands = () => {
  return (
    <div>
      <div>
        <h3>{strings.landing.brands}</h3>
        <div className={styles.titleLine}></div>
      </div>
    </div>
  );
};

export default Brands;
