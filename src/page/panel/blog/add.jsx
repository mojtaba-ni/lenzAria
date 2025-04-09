import { Form, Input, Divider, Typography, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toBase64 } from "../../../shared/utils";
import { strings } from "../../../shared/language";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { path } from "../../../shared/config";

const AddBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(null);
  const [introduction, setIntroduction] = useState(null);
  const [headLine, setHeadLine] = useState(null);
  const [desc, setDesc] = useState(null);
  const [file, setFile] = useState(null);
  const [detail, setDetail] = useState([]);
  console.log({ headLine });
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTitle = (event) => {
    setTitle(event?.target?.value);
  };
  const handleIntroduction = (event) => {
    setIntroduction(event?.target?.value);
  };
  const handleHeadLine = (event) => {
    setHeadLine(event?.target?.value);
  };
  const handleDesc = (event) => {
    setDesc(event?.target?.value);
  };

  const handleContinue = async () => {
    const pic = await toBase64(file);
    const data = {
      headline: headLine,
      desc: desc,
      image: pic,
    };
    setHeadLine(null);
    setDesc(null);
    setFile(null);
    setDetail((prevState) => [...prevState, data]);
  };

  const handleSubmitForm = async () => {
    if(!title && !introduction) return
    if(headLine && desc && file){
      const pic = await toBase64(file);
      const detailLi = {
        headline: headLine,
        desc: desc,
        image: pic,
      }
      
      const requestBody = {
        blogTitle: title,
        introduction: introduction,
        detail: detail,
      }
     
      const res = await axios.post(`${path}/api/blog/add` , requestBody)
    }
  
    const requestBody = {
      blogTitle: title,
      introduction: introduction,
      detail: detail,
    }
    const res = await axios.post(`${path}/api/blog/add` , requestBody)
  
    navigate("/panel/blog")
  };

  return (
    <div style={{ padding: "40px 60px" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormOutlined style={{ fontSize: "1.5rem" }} />
        <h4 className="text-center">افزودن بلاگ</h4>
      </div>
      <Divider
        style={{ backgroundColor: "rgb(0 0 105 / 51%)", height: "2px" }}
      />
      <div>
        <Form
          style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}
        >
          <div style={{ display: "flex", gap: ".5rem", width: "100%" }}>
            <Typography.Title style={{ minWidth: "100px" }} level={5}>
              اسم محصول
            </Typography.Title>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.productNameError,
                },
              ]}
            >
              <Input name="title" onChange={(e) => handleTitle(e)} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: ".5rem", width: "100%" }}>
            <Typography.Title style={{ minWidth: "100px" }} level={5}>
              مقدمه
            </Typography.Title>
            <Form.Item
              name="introduction"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.productNameError,
                },
              ]}
            >
              <Input
                name="introduction"
                onChange={(e) => handleIntroduction(e)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <Divider
            style={{ backgroundColor: "rgb(0 0 105 / 51%)", height: "3px" }}
          />
          <div style={{ display: "flex", gap: ".5rem", width: "100%" }}>
            <Typography.Title style={{ minWidth: "100px" }} level={5}>
              سرتیتر
            </Typography.Title>
            <Form.Item >
            <Input
                name="headTitle"
                style={{ width: "100%" }}
                onChange={(e) => handleHeadLine(e)}
                value={headLine}
              />
                </Form.Item>
          </div>
          <div style={{ display: "flex", gap: ".5rem", width: "100%" }}>
            <Typography.Title style={{ minWidth: "100px" }} level={5}>
              توضیحات
            </Typography.Title>
            <Form.Item>
              <TextArea rows={4} onChange={(e) => handleDesc(e)} value={desc} />
            </Form.Item>
          </div>

          <Typography.Title level={5}>عکس محصول</Typography.Title>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.uploadError,
              },
            ]}
          >
            <input
              id="file"
              type="file"
              value={file}
              onChange={handleFileChange}
            />
          </Form.Item>
          {file && (
            <section>
              جزیات عکس:
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            </section>
          )}
        </Form>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "end",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          <Button
            size="large"
            style={{ width: "100px", fontSize: "1.1rem" }}
            onClick={handleContinue}
          >
            ادامه
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ width: "100px", fontSize: "1.1rem" }}
            htmlType="submit"
            onClick={handleSubmitForm}
          >
            ثبت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
