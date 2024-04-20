import { Form, Input, Divider, Upload, Button } from "antd";
import { FormOutlined, InboxOutlined } from "@ant-design/icons";
import React from "react";
import TextArea from "antd/es/input/TextArea";

const AddBlog = () => {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          <Form.Item label="عنوان">
            <Input />
          </Form.Item>
          <Form.Item label="مقدمه">
            <Input />
          </Form.Item>
          <Divider
            style={{ backgroundColor: "rgb(0 0 105 / 51%)", height: "3px" }}
          />
          <Form.Item label="سرتیتر">
            <Input />
          </Form.Item>
          <Form.Item label="توضیحات">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="افزودن عکس">
            <Form.Item
              name="افزودن عکس"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                 عکس خود را انتخاب کنید
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p> */}
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
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
          <Button size="large" style={{ width: "100px", fontSize: "1.1rem" }}>
            ادامه
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ width: "100px", fontSize: "1.1rem" }}
          >
            ثبت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
