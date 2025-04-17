import { strings } from "../../shared/language";
import styles from "./brands.module.css"

const Brands = () => {
  return (
    <div>
      <div>
        <h4>{strings.landing.brands}</h4>
        <div className={styles.titleLine}></div>
      </div>
    </div>
  );
};

export default Brands;
