import { useEffect, useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  SunOutlined,
  MoonOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  LogoutOutlined,
  EditFilled,
} from "@ant-design/icons";
import { strings } from "../../shared/language";
import ariaLogo from "../../assets/images/logo.jpg";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { Badge, Button, Divider, Input } from "antd";
import { path } from "../../shared/config";
import { useOrder } from "../../shared/store/useOrder";

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { orderList} = useOrder();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLenz, setShowLenz] = useState(false);
  const [showAcc, setShowAcc] = useState(false);
  const [showListPr, setShowListPr] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInp, setSearchInp] = useState();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [medicalLenz, setMedicalLenz] = useState([]);
  const [coloredLens, setColoredLens] = useState([]);
  const [acc, setAcc] = useState([]);
  const [listP, setListP] = useState([]);

  const getAllCategories = async () => {
    const { data } = await axios.get(`${path}/api/category/getAllCategory`);
    setCategory(data?.data);
    let listMd = [];
    let listCl = [];
    let makeupPr = [];
    let listPr = [];
    data?.data.forEach((element) => {
      if (element?.group.title === strings.navbar.medicalLens) {
        listMd.push(element);
        setMedicalLenz(listMd);
      }

      if (element?.group.title === strings.navbar.ColoredLens) {
        listCl.push(element);
        setColoredLens(listCl);
      }
      if (element?.group.title === strings.navbar.accessories) {
        makeupPr.push(element);
        setAcc(makeupPr);
      }
      if (element?.group.title === strings.navbar.cosmetic) {
        listPr.push(element);
        setListP(listPr);
      }
    });
  };
  const getAllBrand = async () => {
    const { data } = await axios.get(`${path}/api/brand/getAllBrand`);
    setBrand(data?.data);
  };

  const handleShowMenu = () => {
    setShow(true);
  };
  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const handleShowLenzMenu = () => {
    setShowLenz(true);
  };
  const handleShowListPr = () => {
    setShowListPr(true);
  };
  const handleIconAddress = (address) => {
    navigate(`/${address}`);
  };
  const handleChangSearch = (event) => {
    setSearchInp(event?.target?.value);
  };
  const handleSearchPr = () => {
    navigate(`/search/${searchInp}`);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userData");
    navigate(`/login`);
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
          <li className={styles.navCol}>
            <Link to="/">
              <h4>{strings.navbar.home}</h4>
            </Link>

            {/* <DownOutlined className={styles.navColIC} /> */}
          </li>
          <li className={styles.navCol} onMouseOver={handleShowMenu}>
            <h4>{strings.navbar.medicalLens}</h4>
            <DownOutlined className={styles.navColIC} />
            <div
              className={show ? styles.navColListActive : styles.navColList}
              onMouseOut={() => setShow(false)}
            >
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
              {medicalLenz?.map((item, index) => (
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
          <li className={styles.navCol} onMouseOver={handleShowLenzMenu}>
            <h4>{strings.navbar.ColoredLens}</h4>
            <DownOutlined className={styles.navColIC} />
            <div
              className={showLenz ? styles.navColListActive : styles.navColList}
              onMouseOut={() => setShowLenz(false)}
            >
              {coloredLens?.map((item, index) => (
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
            <div
              className={showAcc ? styles.navColListActive : styles.navColList}
              onMouseOut={() => setShowAcc(false)}
            >
              {acc?.map((item, index) => (
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
          <li className={styles.navCol} onMouseOver={handleShowListPr}>
            <h4>{strings.navbar.cosmetic}</h4>
            <DownOutlined className={styles.navColIC} />
            <div
              className={
                showListPr ? styles.navColListActive : styles.navColList
              }
              onMouseOut={() => setShowListPr(false)}
            >
              {listP?.map((item, index) => (
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
            <Link to="./blog">
              {" "}
              <h4>{strings.navbar.blog}</h4>
            </Link>
          </li>
          <li className={styles.navCol}>
            <Link to="./vlog">
              <h4>{strings.navbar.blogVideo}</h4>
            </Link>
          </li>
          <li className={styles.navCol}>
            <Link to="./lenzTest">
              <h4>{strings.navbar.lenzTest}</h4>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.navHandle}>
        <div className={styles.navUser}>
          {theme === "light" ? (
            <MoonOutlined className={styles.navUserIc} onClick={switchTheme} />
          ) : (
            <SunOutlined className={styles.navUserIc} onClick={switchTheme} />
          )}
          <Badge count={orderList && orderList[0]?.count} size="large">
            <ShoppingCartOutlined
              className={styles.navUserIc}
              onClick={() => handleIconAddress("order")}
            />
          </Badge>

          <div>
            <UserOutlined
              className={styles.navUserIc}
              onClick={handleShowUser}
            />
            <div
              className={
                showUser
                  ? userData
                    ? styles.navUserActive
                    : styles.navUserActiveSign
                  : styles.navUserList
              }
            >
              {userData ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    gap: ".6rem",
                  }}
                >
                  <div
                    className={styles.navUserLi}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".3rem",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#6fb5be69",
                        height: "25px",
                      }}
                    ></div>
                    <h5>{userData?.username}</h5>

                    <h5>{userData?.phoneNumber}</h5>
                  </div>
                  <Divider />
                  <div
                    className={styles.navUserLi}
                    onClick={() => handleIconAddress("profile")}
                  >
                    <h5>ناحیه کاربری</h5>
                    <UserOutlined style={{ fontSize: "1.6rem" }} />
                  </div>
                  <Divider />
                  <div className={styles.navUserLi} onClick={handleLogOut}>
                    <h5 style={{ color: "red" }}>خروج</h5>
                    <LogoutOutlined
                      style={{ fontSize: "1.6rem", color: "red" }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: ".6rem",
                  }}
                >
                  <Link to={"/login"} className={styles.linkSign}>
                    <h5>ورود</h5>
                    <LogoutOutlined style={{ fontSize: "1.6rem" }} />
                  </Link>

                  <Divider />
                  <Link to={"/signup"} className={styles.linkSign}>
                    <h5>ثبت نام</h5>
                    <EditFilled />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <SearchOutlined
            className={styles.navUserIc}
            onClick={() => setSearch(!search)}
          />
          <EnvironmentOutlined
            className={styles.navUserIc}
            onClick={() => handleIconAddress("map")}
          />
          <HeartOutlined
            className={styles.navUserIc}
            onClick={() => handleIconAddress("favorite")}
          />
        </div>
        <div className={styles.navSearch}>
          {search && (
            <div className={styles.navSearchBox}>
              <Input
                placeholder="..."
                name="search"
                value={searchInp}
                onChange={handleChangSearch}
              />
              <Button type="primary" size="middle" onClick={handleSearchPr}>
                ثبت
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
