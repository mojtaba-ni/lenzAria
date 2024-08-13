import { useState } from "react";
import { Input, Form, Button, Card, message, Spin } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PhoneFilled,
  LoadingOutlined,
  InteractionOutlined
} from "@ant-design/icons";
import { strings } from "../shared/language";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import style from "./styles/signup.module.css";
import { path } from "../shared/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientCaptcha from "react-client-captcha";

const SignUp = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    username: null,
    phoneNumber: null,
    password: null,
    captcha: null,
  });

  const [messageApi, contextHolder] = message.useMessage();


  const [error, setError] = useState("");
  const [captchaCode, setcCaptchaCode] = useState("");
  const [loading, setLoading] = useState(false);


  const onSignUp = async () => {
    setLoading(true);
    if (signInData?.captcha !== captchaCode) {
      messageApi.open({
        type: "error",
        content: "کد امنیتی اشتباه وارد شده است",
        style: {
          marginTop: '10vh',
          height:"100px !important",
          width:"200px !important"
        },
        duration: 5,
      });
      setLoading(false);
      return;
    }
    setError("");
    // setLoading(true);
    const data = {
      username: signInData.username,
      phoneNumber: signInData.phoneNumber,
      password: signInData.password,
    };

    const res = await axios.post(`${path}/api/register/signup`, data);
    messageApi.open({
      type: res?.data?.isSuccess ? "success" : "error",
      content: res?.data?.message,
      style: {
        marginTop: "10vh",
        height: "100px !important",
        width: "200px !important",
      },
      duration: 5,
    });

    setLoading(false);
    if (res?.data?.isSuccess) {
      localStorage.setItem("userData", JSON.stringify(res?.data?.data));
      navigate("/");
    }
  };
    const handleCaptcha = (code) =>{
      setcCaptchaCode(code)
    }
  const handleInp = (event) => {
    setSignInData((prevState) => ({
      ...prevState,
      [event?.target?.name]: event.target.value,
    }));
  };

  return (
    <>
      {contextHolder}
      <div className={style.signupWrapper}>
        <Card className={style.singupBox}>
          <div className=" d-flex flex-column align-items-center">
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              {strings.register.title}
            </p>
            <Form>
              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ gap: ".7rem" }}
              >
                <BiSolidUser style={{ fontSize: "1.7rem" }} />
                <h5 className={style.inputBoxTitle}>نام کاربری</h5>
                <Form.Item
                  style={{ margin: ".3rem !important" }}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: strings.profile.errorMessage.usernameError,
                    },
                  ]}
                >
                  <Input
                    name="username"
                    onChange={(e) => handleInp(e)}
                    className={style.inputBox}
                  />
                </Form.Item>
              </div>
              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ gap: ".7rem" }}
              >
                <PhoneFilled style={{ fontSize: "1.5rem" }} />
                <h5 className={style.inputBoxTitle}>شماره تلفن</h5>
                <Form.Item
                  style={{ margin: ".3rem !important" }}
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: strings.profile.errorMessage.phoneNumberError,
                    },
                  ]}
                >
                  <Input
                    name="phoneNumber"
                    onChange={(e) => handleInp(e)}
                    className={style.inputBox}
                  />
                </Form.Item>
              </div>
              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ gap: ".7rem" }}
              >
                <RiLockPasswordFill style={{ fontSize: "1.8rem" }} />
              
                <h5 className={style.inputBoxTitle}>رمز عبور</h5>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: strings.profile.errorMessage.passwordError,
                    },
                  ]}
                >
                  <Input.Password
                    className={style.inputBox}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    name="password"
                    onChange={(e) => handleInp(e)}
                  />
                </Form.Item>
              </div>

              <div
                className="d-flex flex-row align-items-center mb-4"
                style={{ gap:".7rem" }}
              >
                <InteractionOutlined style={{ fontSize: "1.8rem" }} />
                <h5 className={style.inputBoxTitle}>کد امنیتی</h5>
                {/* <HCaptcha
                ref={captcha}
                sitekey={hCaptchaSiteToken}
                onVerify={(token) => setToken(token)}
                onExpire={(e) => setToken("")}
              /> */}
                <div className={style.inputBoxCaptcha}>
                  <Input
                    name="captcha"
                    onChange={(e) => handleInp(e)}
                    className={style.inputBox}
                  />
                  <div style={{ position: "absolute", top: "2px", left: 0 }}>
                    <ClientCaptcha captchaCode={(code) => handleCaptcha(code)}/>
                  </div>
                </div>
              </div>
              {/* /* {error && <p style={{textAlign:"center" , color:"red"}}>{error}</p>} */}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "2rem 0",
                }}
              >
                <Button
                  type="primary"
                  ghost
                  size="large"
                  htmlType="submit"
                  style={{ width: "100px", fontSize: "1.1rem" }}
                  onClick={onSignUp}
                  disabled={
                    !signInData?.password ||
                    !signInData?.phoneNumber ||
                    !signInData?.username ||
                    !signInData?.captcha
                  }
                >
                  {loading ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                  ) : (
                    strings.register.submit
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
