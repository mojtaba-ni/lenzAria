import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button , message} from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { path } from "../../shared/config";
import {UserOutlined} from "@ant-design/icons";
import style from "./style.module.css";

// eslint-disable-next-line react/prop-types
const Comments = ({ productId, username }) => {
  const [value, setValue] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [update, setUpdate] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  const getComments = async () => {
    const { data } = await axios.get(
      `${path}/api/comment/getAllProductComment?productId=${productId}`
    );
    if (data?.isSuccess) {
      setAllComment(data?.data);
    }
  };

  const handleCommentSubmit = async() => {
    if(value === ""){
      messageApi.open({
        type:"error",
        content: "لطفا نظر خود را وارد کنید",
        style: {
          marginTop: '7vh',
          height:"100px !important",
          width:"200px !important"
        },
        duration: 5,
      });
      return
    }
      const requestbody = {
        username,
        productId,
        title:value
      }
      const res = await axios.post(`${path}/api/comment/add` , requestbody)
      console.log({res});
      if(!res?.data.isSuccess){
        messageApi.open({
          type:"error",
          content: res?.data?.message,
          style: {
            marginTop: '10vh',
            height:"100px !important",
            width:"200px !important"
          },
          duration: 5,
        });
        return
      }
      messageApi.open({
        type:"success",
        content: res?.message,
        style: {
          marginTop: '7vh',
          height:"100px !important",
          width:"200px !important"
        },
        duration: 5,
      });
      setValue("")
      setUpdate(!update)
  }

  useEffect(() => {
    if (username) {
      getComments();
    }
  }, [update , productId]);

  return (
    <div>
      {username ? (
        <>
        {contextHolder}
          {allComment?.length > 0 ? (
            allComment?.map((item, index) => (
              <div key={index} className={style.commentBox}>
                <div style={{display:"flex", alignItems:"center" , gap:".5rem"}}>
                <Avatar
                  size={45}
                  icon={<UserOutlined />}
                  className={style.panelSideIcon}
                />
                    <h5 className={style.commentUser}>{item?.username} : </h5>
                </div>
            
                <p style={{fontSize:"1rem"}}>{item?.title}</p>
                {item?.response && (
                  <div style={{display:"flex" , gap:"1rem" , alignItems:"center"}}>
                    <p style={{color:"#62666D" , margin:"0 !important" , fontSize:".9rem"}}>پاسخ</p>
                    <p style={{fontSize:".9rem" , color:"#62666D"}}>{item?.response}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>نظری ثبت نشده است</div>
          )}
          <div className={style.commentTextBox}>
            <TextArea
              value={value}
              onChange={(e) => setValue(e?.target?.value)}
              placeholder="نظر خود را وارد نمایید ..."
              autoSize={{
                minRows: 5,
                maxRows: 7,
              }}
            />
            <div className={style.commentSubmit}>
              <Button
                type="primary"
                size="middle"
                className={style.commentSubmitBtn}
                onClick={handleCommentSubmit}
              >
                ثبت نظر
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={style.profileNotFound}>
          <strong className={style.profileTitle}>
            {" "}
            برای ثبت نظر درباره ی محصول باید با حساب کاربری خود وارد شوید
          </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "200px",
            }}
          >
            <Link to="/login">
              <Button type="primary" ghost>
                ورود
              </Button>
            </Link>
            <Link to="/signUp">
              <Button type="primary" ghost>
                ثبت نام
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
