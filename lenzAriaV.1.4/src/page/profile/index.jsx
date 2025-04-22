import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import style from "../styles/profile/profile.module.css";
import { Row, Col, Avatar, Button, Input, Typography, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { strings } from "../../shared/language";
import axios from "axios";
import { path } from "../../shared/config";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()

  const [address, setAddress] = useState({});
  const [location, setLocation] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [updateLoc, setupdateLoc] = useState(false);
  const [activePart, setActivePart] = useState(2);
  
  const getLocationData = async() => {
    const userId="660eb7eaf4db4975e683f01c"
    const {data} = await axios.get(`${path}/api/address/getAddress?userId=${userId}`)
   
    const loc = data?.data?.locations
    setLocation(loc)
  }
  const handleAddressData = (event) => {
    switch (event.target.name) {
      case "description":
        setAddress((prev) => ({
          ...prev,
          description: event.target.value,
        }));
        break;
      case "number":
        setAddress((prev) => ({
          ...prev,
          number: parseInt(event.target.value),
        }));
        break;
      case "zipCode":
        setAddress((prev) => ({
          ...prev,
          zipCode: event.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const handleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleSubmitAddress = async () => {
    if (!address.description || !address.number || !address.zipCode) return;
    const addressData = {
      userId: "660eb7eaf4db4975e683f01c",
      address: [address],
    };
    const { data } = await axios.post(
      `${path}/api/address/add`,
      addressData
    );

    if (!data.isSuccess) {
      return;
    }
    setShowAdd(!showAdd)
    setupdateLoc(!updateLoc)
  };

  const handleFavorite = () => {
    navigate("/favorite")
  }

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("favoritePr");
    navigate(`/login`);
  };

  useEffect(() => {
    getLocationData()
  }, [updateLoc])
  

  return (
    <div>
      <Navbar />
      <Row className={style.profileWrapper} justify="space-evenly">
        <Col xs={24} sm={12} md={5}>
          <ul className={style.profileUi}>
            <li
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h2>{strings.profile.info}</h2>
              {/* <h4 style={{ color: "gray" }}>سفارشات</h4> */}
            </li>
            <li
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <Avatar size={60} icon={<UserOutlined />} />
              <h4>a.moradi</h4>
            </li>
            <div>
              {/* <li className={ activePart === 1 ? style.profileLiActive : style.profileLi}>{strings.profile.orders}</li> */}
              <li className={activePart === 2 ? style.profileLiActive : style.profileLi }>{strings.profile.address}</li>
              {/* <li className={activePart === 3 ? style.profileLiActive : style.profileLi }>{strings.profile.account}</li> */}
              <li className={activePart === 4 ? style.profileLiActive : style.profileLi } onClick={handleFavorite}>{strings.profile.favorite}</li>
              <li className={activePart === 5 ? style.profileLiActive : style.profileLi } onClick={handleLogOut}>{strings.profile.logout}</li>
            </div>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <div className={style.descProfile}>
            <h4>{strings.profile.addressTitle}</h4>
            {location.length> 0 && !showAdd && location.map((item,index)=> (
                <p key={index}>{item?.description}</p>
            ))}
            <Button
              type="link"
              block
              className={style.descProfileBtn}
              onClick={handleShowAdd}
            >
              {strings.profile.addAddress}
            </Button>
            {showAdd && (
              <Form>
                <div className={style.descProfileInp}>
                  <div className={style.descprofileLi}>
                    <Typography.Title level={5}>پلاک :</Typography.Title>
                    <Form.Item
                      name="number"
                      rules={[
                        {
                          required: true,
                          message: strings.profile.errorMessage.numberError,
                        },
                      ]}
                    >
                      <Input
                        placeholder="پلاک منزل"
                        name="number"
                        onChange={(e) => handleAddressData(e)}
                      />
                    </Form.Item>
                  </div>
                  <div className={style.descprofileLi}>
                    <Typography.Title level={5}>کد پستی :</Typography.Title>

                    <Form.Item
                      name="zipCode"
                      rules={[
                        {
                          required: true,
                          message: strings.profile.errorMessage.zipCodeError,
                        },
                      ]}
                    >
                      <Input
                        placeholder="کد پستی"
                        name="zipCode"
                        onChange={(e) => handleAddressData(e)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={style.descprofileLi}>
                  <Typography.Title level={5}>
                    {strings.profile.zipCode} :
                  </Typography.Title>

                  <Form.Item
                    style={{ width: "100%" }}
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: strings.profile.errorMessage.descriptionError,
                      },
                    ]}
                  >
                    <Input.TextArea
                      showCount
                      maxLength={120}
                      placeholder="توضیحات آدرس ..."
                      style={{
                        height: 120,
                        resize: "none",
                      }}
                      name="description"
                      onChange={(e) => handleAddressData(e)}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "Center",
                    display: "flex",
                  }}
                >
                  <Button
                    type="primary"
                    block
                    className={style.descProfileBtn}
                    onClick={handleSubmitAddress}
                    htmlType="submit"
                  >
                    {strings.submit}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Profile;
