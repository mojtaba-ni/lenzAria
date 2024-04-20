import { Button, Divider, Form, Input, Typography } from "antd";
import { strings } from "../../../shared/language";
import { ArrowDownOutlined } from "@ant-design/icons";
import style from "../../styles/panel.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState();
  const [steps, setSteps] = useState([]);
  const [stepInp, setStepInp] = useState();


  const handleCategorySteps = (e) => {
    setStepInp({ title: e?.target?.value });
  };
  const handleCategory = (e) => {
    setCategory(e?.target?.value);
  };
  const handleAddSteps = () => {
    if (stepInp) {
      setSteps((prevState) => [...prevState, stepInp]);
      setStepInp("");
    }
  };

  const handleSubmitCategory = async() => {
    const data = {
        title: category,
        step:steps
    }
    const res = await axios.post("http://localhost:8000/api/category/add" , data )
    navigate("/panel/category")
  };

  return (
    <div>
      <Form
        fields={[
          {
            name: ["step"],
            value: stepInp?.title,
          },
        ]}
      >
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>اسم دسته </Typography.Title>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.categoryError,
              },
            ]}
          >
            <Input
              placeholder="..."
              name="name"
              onChange={(e) => handleCategory(e)}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>اسم زیر دسته </Typography.Title>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Form.Item
              name="step"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.stepError,
                },
              ]}
            >
              <Input
                placeholder="..."
                name="step"
                style={{ width: "400px" }}
                onChange={(e) => handleCategorySteps(e)}
              />
            </Form.Item>
            <div>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                htmlType="submit"
                onClick={handleAddSteps}
              >
                {strings.add}
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        {category && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
                minHeight: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  minWidth: "90px",
                  backgroundColor: "#000069",
                  borderRadius: "5px",
                  color: "#fff",
                  padding: ".5rem",
                }}
              >
                <h4>{category}</h4>
              </div>
              <ArrowDownOutlined />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                }}
              >
                {steps?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: "center",
                      minWidth: "90px",
                      backgroundColor: "#000069",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: ".5rem",
                    }}
                  >
                    <strong>{item?.title}</strong>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmitCategory}
                
              >
                {strings.submit}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default AddCategory;