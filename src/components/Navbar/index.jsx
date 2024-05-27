import { useEffect, useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { strings } from "../../shared/language";
import ariaLogo from "../../assets/images/logo.jpg";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Navbar = ({search , setSearch}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLenz, setShowLenz] = useState(false);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/category/getAllCategory"
    );
    setCategory(data?.data);
  };
  const getAllBrand = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/brand/getAllBrand"
    );
    setBrand(data?.data);
  };

  const handleShowMenu = () => {
    setShow(true);
  };

  const handleShowLenzMenu = () => {
    setShowLenz(true);
  };

  const handleIconAddress = (address) => {
    navigate(`/${address}`);
  };

  useEffect(() => {
    getAllCategories();
    getAllBrand();
  }, []);

  return (
    <div className={styles.navContainer}>
      <div className={styles.navHeadLine}>
        <img src={ariaLogo} alt="ariaLogo" className={styles.logo} />
        <ul className={styles.navUi}>
          <li className={styles.navCol} onMouseOver={handleShowMenu}>
            <h4>{strings.navbar.home}</h4>
            <DownOutlined className={styles.navColIC} />
            <div
              className={show ? styles.navColListActive : styles.navColList}
              onMouseOut={() => setShow(false)}
            >
              <div className={styles.navList}>
                <div className={styles.navListTitleLine}>
                  <h3>{strings.navbar.lenzType}</h3>
                </div>
                <ul className={styles.navListBody}>
                  <li>{strings.navbar.medical}</li>
                  <li>{strings.navbar.hard}</li>
                  <li>{strings.navbar.medicalColor}</li>
                  <li>{strings.navbar.astigmat}</li>
                </ul>
              </div>
              <div className={styles.navList}>
                <div className={styles.navListTitleLine}>
                  <h3>{strings.navbar.Period}</h3>
                </div>
                <ul className={styles.navListBody}>
                  <Link to={`/periods/1`} style={{ color: "#4f4f4f" }}>
                    <li>{strings.navbar.daily}</li>
                  </Link>
                  <Link to={`/periods/2`} style={{ color: "#4f4f4f" }}>
                  <li>{strings.navbar.monthly}</li>
                  </Link>
                  <Link to={`/periods/3`} style={{ color: "#4f4f4f" }}>
                  <li>{strings.navbar.seasonal}</li>
                  </Link>
                  <Link to={`/periods/4`} style={{ color: "#4f4f4f" }}>
                  <li>{strings.navbar.yearly}</li>
                  </Link>
              
                </ul>
              </div>
              <div className={styles.navList}>
                <div className={styles.navListTitleLine}>
                  <h3>{strings.navbar.brand}</h3>
                </div>
                <ul className={styles.navListBody}>
                  {brand?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/brands/${item._id}`}
                      style={{ color: "#4f4f4f" }}
                    >
                      <li key={index}>{item?.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          <li className={styles.navCol}>
            <h4>{strings.navbar.medicalLens}</h4>
            <DownOutlined className={styles.navColIC} />
          </li>
          <li className={styles.navCol} onMouseOver={handleShowLenzMenu}>
            <h4>{strings.navbar.ColoredLens}</h4>
            <DownOutlined className={styles.navColIC} />
            <div
              className={showLenz ? styles.navColListActive : styles.navColList}
              onMouseOut={() => setShowLenz(false)}
            >
              {category?.map((item, index) => (
                <div className={styles.navList} key={index}>
                  <Link
                    className={styles.navListTitleLine}
                    to={`/products/${item._id}`}
                  >
                    <h3>{item.title}</h3>
                  </Link>
                  <ul className={styles.navListBody}>
                    {item.step.map((sub, index) => (
                      <Link
                        key={index}
                        to={`/products/${sub._id}`}
                        style={{ color: "#4f4f4f" }}
                      >
                        <li>{sub?.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li className={styles.navCol}>
            <h4>{strings.navbar.accessories}</h4>
            <DownOutlined className={styles.navColIC} />
          </li>
          <li className={styles.navCol}>
            <h4>{strings.navbar.cosmetic}</h4>
          </li>
          <li className={styles.navCol}>
            <Link to="./blog" style={{color: "#4f4f4f" }}>
              {" "}
              <h4>{strings.navbar.blog}</h4>
            </Link>
          </li>
          <li className={styles.navCol}>
            <h4>{strings.navbar.blogVideo}</h4>
          </li>
        </ul>
      </div>
      <div className={styles.navUser}>
        <UserOutlined className={styles.navUserIc} />
        <SearchOutlined className={styles.navUserIc} onClick={() => setSearch(!search)} />
        <HeartOutlined className={styles.navUserIc} />
        <ShoppingCartOutlined className={styles.navUserIc} />

        <UserOutlined
          className={styles.navUserIc}
          onClick={() => handleIconAddress("profile")}
        />
      </div>
    </div>
  );
};

export default Navbar;
