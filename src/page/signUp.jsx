import React from "react";
import {
  MDBCard,
} from "mdb-react-ui-kit";
import { Input, Form , Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { strings } from "../shared/language";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import style from "./styles/signup.module.css";

const SignUp = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e3e3e3",
        height:"100vh"
      }}
    >
      <MDBCard
        className="text-black m-5"
        style={{
          borderRadius: "25px",
          width: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className=" d-flex flex-column align-items-center">
          <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            {strings.register.title}
          </p>
          <Form>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ gap: "1rem" }}
            >
              <BiSolidUser style={{ fontSize: "1.3rem" }} className="mb-2" />
              <h5 className={style.inputBoxTitle}>نام کاربری</h5>
              <Input
                className={style.inputBox}
                required
              />
            </div>

            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ gap: "1.2rem" }}
            >
              <RiLockPasswordFill style={{ fontSize: "1.3rem" }} className="mb-2" />
              <h5 className={style.inputBoxTitle}>رمز عبور</h5>
              <Input.Password
                className={style.inputBox}
                required
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <h5 className={style.inputBoxTitle}>کد امنیتی</h5>
            </div>

            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ gap: ".4rem" }}
            >
              <BiSolidUser style={{ fontSize: "1.2rem" }} className="mb-2" />
              <h5 className={style.inputBoxTitle}>ورود کد امنیتی</h5>
              <Input placeholder="Basic usage" className={style.inputBox} />
            </div>

            {/* <div className="mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Subscribe to our newsletter"
              />
            </div> */}
            <div style={{width:"100%" , display:"flex" , alignItems:"center" , justifyContent:"center" , margin:"2rem 0"}}>
            <Button type="primary" size="large" style={{width:"100px" , fontSize:"1.1rem"}}>
            {strings.register.submit}
            </Button>
               
             
            </div>
          </Form>
        </div>

        {/* <MDBCol
           md="10"
           lg="6"
           className="order-1 order-lg-2 d-flex align-items-center"
         >
           <MDBCardImage
             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
             fluid
           />
         </MDBCol> */}
      </MDBCard>
    </div>
  );
};

export default SignUp;
