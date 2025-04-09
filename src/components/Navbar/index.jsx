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
import { Badge, Button, Divider, Input, Modal } from "antd";
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

  const { orderList } = useOrder();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLenz, setShowLenz] = useState(false);
  const [showAcc, setShowAcc] = useState(false);
  const [showListPr, setShowListPr] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchInp, setSearchInp] = useState("");
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
    setShowLenz(false);
    setShowAcc(false);
    setShowListPr(false);
  };
  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const handleShowLenzMenu = () => {
    setShowLenz(true);
    setShowAcc(false);
    setShowListPr(false);
    setShow(false);
  };
  const handleShowAcc = () => {
    setShowAcc(true);
    setShowListPr(false);
    setShow(false);
    setShowLenz(false);
  };
  const handleShowListPr = () => {
    setShowListPr(true);
    setShow(false);
    setShowLenz(false);
    setShowAcc(false);
  };
  const handleIconAddress = (address) => {
    navigate(`/${address}`);
  };
  const handleChangSearch = (event) => {
    setSearchInp(event?.target?.value);
  };
  const handleSearchPr = () => {
    navigate(`/search/${searchInp}`);
    setIsSearchModalVisible(false);
    setSearchInp("");
  };
  const handleLogOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("favoritePr");
    navigate(`/login`);
  };

  const showSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  const handleSearchModalCancel = () => {
    setIsSearchModalVisible(false);
    setSearchInp("");
  };

  useEffect(() => {
    getAllCategories();
    getAllBrand();
  }, []);

  useEffect(() => {
    if (isSearchModalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, [isSearchModalVisible]);

  return (
    <div className={styles.navContainer}>
      <div className={styles.navHeadLine}>
        <img src={ariaLogo} alt="ariaLogo" className={styles.logo} />
        <ul className={styles.navUi}>
          <li className={styles.navCol}>
            <Link to="/">
              <h5>{strings.navbar.home}</h5>
            </Link>


          </li>
          <li className={styles.navCol} onMouseOver={handleShowMenu}>
            <h5>{strings.navbar.medicalLens}</h5>
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
                        <li style={{ fontSize: ".92rem" }}>{sub?.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li className={styles.navCol} onMouseOver={handleShowLenzMenu}>
            <h5>{strings.navbar.ColoredLens}</h5>
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
                        <li style={{ fontSize: ".92rem" }}>{sub?.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li className={styles.navCol} onMouseOver={handleShowAcc}>
            <h5>{strings.navbar.accessories}</h5>
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
                    <h3>{item?.title}</h3>
                  </Link>
                  <ul className={styles.navListBody}>
                    {item.step.map((sub, index) => (
                      <Link
                        key={index}
                        to={`/products/${sub._id}`}
                        style={{ color: "#4f4f4f" }}
                      >
                        <li style={{ fontSize: ".92rem" }}>{sub?.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li className={styles.navCol} onMouseOver={handleShowListPr}>
            <h5>{strings.navbar.cosmetic}</h5>
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
                        <li style={{ fontSize: ".92rem" }}>{sub?.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li className={styles.navCol}>
            <Link to="/blog">
              {" "}
              <h5>{strings.navbar.blog}</h5>
            </Link>
          </li>
          <li className={styles.navCol}>
            <Link to="/vlog">
              <h5>{strings.navbar.blogVideo}</h5>
            </Link>
          </li>
          <li className={styles.navCol}>
            <Link to="/lenzTest">
              <h5>{strings.navbar.lenzTest}</h5>
            </Link>
          </li>
          <li className={styles.navCol}>
            <Link to="/about">
              <h5>درباره ما</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.navHandle}>
        <div className={styles.navUser}>
          <SearchOutlined
            className={styles.navUserIc}
            onClick={showSearchModal}
          />
          
          {theme === "light" ? (
            <MoonOutlined className={styles.navUserIc} onClick={switchTheme} />
          ) : (
            <SunOutlined className={styles.navUserIc} onClick={switchTheme} />
          )}
          <EnvironmentOutlined
            className={styles.navUserIc}
            onClick={() => handleIconAddress("map")}
          />
          <HeartOutlined
            className={styles.navUserIc}
            onClick={() => handleIconAddress("favorite")}
          />
          <Badge count={orderList && orderList?.length} size="large">
            
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
              onMouseLeave={() => setShowUser(false)}
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
                    <h6>{userData?.username}</h6>

                    <h6>{userData?.phoneNumber}</h6>
                  </div>
                  <Divider />
                  <div
                    className={styles.navUserLi}
                    onClick={() => handleIconAddress("profile")}
                  >
                    <h6>ناحیه کاربری</h6>
                    <UserOutlined style={{ fontSize: "1.6rem" }} />
                  </div>
                  <Divider />
                  <div className={styles.navUserLi} onClick={handleLogOut}>
                    <h6 style={{ color: "red" }}>خروج</h6>
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
                    <h6>ورود</h6>
                    <LogoutOutlined style={{ fontSize: "1.6rem" }} />
                  </Link>

                  <Divider />
                  <Link to={"/signup"} className={styles.linkSign}>
                    <h6>ثبت نام</h6>
                    <EditFilled />
                  </Link>
                </div>
              )}
            </div>
          </div>

          
          
        </div>
        <div className={styles.navSearch}>
          {isSearchModalVisible && (
            <Modal
              title="جستجو"
              open={isSearchModalVisible}
              onCancel={handleSearchModalCancel}
              footer={[
                <Button key="back" onClick={handleSearchModalCancel}>
                  انصراف
                </Button>,
                <Button 
                  key="submit" 
                  type="primary" 
                  onClick={handleSearchPr}
                  disabled={!searchInp.trim()}
                >
                  جستجو
                </Button>,
              ]}
              width={400}
              centered
              destroyOnClose
              maskClosable={false}
              className={styles.searchModal}
              maskStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <Input
                placeholder="جستجو کنید..."
                value={searchInp}
                onChange={handleChangSearch}
                onPressEnter={handleSearchPr}
                size="large"
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
