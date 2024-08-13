import { useState } from "react";
import { Input, Form, Button, Card , message, Spin} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone , PhoneFilled ,LoadingOutlined  , InteractionOutlined} from "@ant-design/icons";
import { strings } from "../shared/language";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from "./styles/signup.module.css";
import { path } from "../shared/config";
// import useButtonLoader from "../shared/hooks/useButtonLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientCaptcha from "react-client-captcha";

const Login = () => {

  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    phoneNumber: null,
    password: null,
    captcha: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaCode, setcCaptchaCode] = useState("");

 
  // const [element, setLoading] = useButtonLoader("ورود");

  const handleCapcha = (code) =>{
    setcCaptchaCode(code)
  }

  const onSignUp = async() => {
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
    if (!signInData?.captcha) {
      setError("کد امنیتی را وارد کنید");
      return;
    }
    setError("");
    
    const data = {
      phoneNumber: signInData.phoneNumber,
      password: signInData.password,
    };
    const res = await axios.post(`${path}/api/register/login` , data)
    
    messageApi.open({
      type: res?.data?.isSuccess ? "success" : "error",
      content: res?.data?.message,
      style: {
        marginTop: '10vh',
        height:"100px !important",
        width:"200px !important"
      },
      duration: 5,
    });
    setLoading(false);
    if(res?.data?.isSuccess ){
      localStorage.setItem('userData', JSON.stringify(res?.data?.data));
      navigate("/");
    }
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
     className={style.signupWrapper}
    >
      <Card
        className={style.singupBox}
     
      >
        <div className=" d-flex flex-column align-items-center">
          <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
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

            <div className="d-flex flex-row align-items-center mb-4" style={{gap:".7rem"}} >
            <InteractionOutlined style={{ fontSize: "1.8rem" }} />
              <h5 className={style.inputBoxTitle}>کد امنیتی</h5>
              <div className={style.inputBoxCaptcha}>
                  <Input
                    name="captcha"
                    onChange={(e) => handleInp(e)}
                    className={style.inputBox}
                  />
                  <div style={{ position: "absolute", top: "2px", left: 0 }}>
                    <ClientCaptcha captchaCode={(code) => handleCapcha(code)}/>
                  </div>
                </div>
            </div>
            {/* {error && <p style={{textAlign:"center" , color:"red"}}>{error}</p>} */}
          
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop:"2rem",
                marginBottom:"1rem",
              }}
            >
              <Button
                type="primary"
                ghost
                size="large"
                htmlType="submit"
                style={{ width: "100px", fontSize: "1.1rem" }}
                onClick={onSignUp}
                disabled={!signInData?.password || !signInData?.phoneNumber || !signInData?.captcha} 
              >
                  {loading ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                  ) : (
                    strings.register.submit
                  )}
              </Button>
            </div>
            <div style={{display:"flex" , alignItems:"center" , gap:".4rem"}}>
             <RiLockPasswordFill style={{ fontSize: "1.4rem" , color:"#386bc0" }} />
              <Link to="/signUp" className={style.signUplink}>
              ثبت نام در سایت
              </Link>
             </div>
          </Form>
        </div>
      </Card>
     
    </div>
    </>

  );
};

export default Login;
