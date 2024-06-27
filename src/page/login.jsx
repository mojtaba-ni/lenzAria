import { useRef, useState } from "react";

import { Input, Form, Button, Card , message} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone , PhoneFilled } from "@ant-design/icons";
import { strings } from "../shared/language";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Alert } from 'antd';
import HCaptcha from "@hcaptcha/react-hcaptcha";
import style from "./styles/signup.module.css";
import { hCaptchaSiteToken, path } from "../shared/config";
// import useButtonLoader from "../shared/hooks/useButtonLoader";
import axios from "axios";

const Login = () => {
  const [signInData, setSignInData] = useState({
    username: null,
    phoneNumber: null,
    password: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const captcha = useRef();
  // const [element, setLoading] = useButtonLoader("ورود");

  const onSignUp = async() => {
    // if (!token) {
    //   setError("کد امنیتی را وارد کنید");
    //   return;
    // }
    setError("");
    // setLoading(true);
    const data ={
    //   username: signInData.username,
      phoneNumber: signInData.phoneNumber,
      password: signInData.password,
      // token:token
    } 
    const res = await axios.post(`${path}/api/register/signup` , data)
    
    messageApi.open({
      type: 'error',
      content: res?.data?.title,
      style: {
        marginTop: '10vh',
        height:"100px !important",
        width:"200px !important"
      },
      duration: 5,
    });
    
  };

  const handleInp = (event) => {
  
    setSignInData((prevState) => ({
      ...prevState,
      [event?.target?.name]: event.target.value,
    }));
  };

  return (
    <>
        {contextHolder}
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e3e3e3",
        height: "100vh",
      }}
    >
      <Card
        className={style.singupBox}
     
      >
        <div className=" d-flex flex-column align-items-center">
          <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            {strings.login.title}
          </p>
          <Form>
            {/* <div
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
                    message: strings.profile.errorMessage.productNameError,
                  },
                ]}
              >
                <Input
                  name="username"
                  onChange={(e) => handleInp(e)}
                  className={style.inputBox}
                />
              </Form.Item>
            </div> */}
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
                    message: strings.profile.errorMessage.productNameError,
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
                    message: strings.profile.errorMessage.productNameError,
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

            {/* <div className="d-flex flex-row align-items-center mb-4" style={{justifyContent:"space-around"}} >
              <h5 className={style.inputBoxTitle}>کد امنیتی</h5>
              <HCaptcha
                ref={captcha}
                sitekey={hCaptchaSiteToken}
                onVerify={(token) => setToken(token)}
                onExpire={(e) => setToken("")}
              />
            </div> */}
            {/* {error && <p style={{textAlign:"center" , color:"red"}}>{error}</p>} */}

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
                size="large"
                htmlType="submit"
                style={{ width: "100px", fontSize: "1.1rem" }}
                onClick={onSignUp}
                disabled={!signInData?.password || !signInData?.phoneNumber}
              >
                {strings.login.submit}
              </Button>
            </div>
          </Form>
        </div>
      </Card>
     
    </div>
    </>

  );
};

export default Login;
