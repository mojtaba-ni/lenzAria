import { Button, Divider, Form, Input, Select, Typography } from "antd";
import { strings } from "../../../shared/language";
import { ArrowDownOutlined, CloseOutlined } from "@ant-design/icons";
import style from "../../styles/panel.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "../../../shared/config";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [steps, setSteps] = useState([]);
  const [stepInp, setStepInp] = useState();
  const [activeGroup, setActiveGroup] = useState(null);

  const group = [
    { value: 1, label: "لنز طبی" },
    { value: 2, label: "لنز رنگی" },
    { value: 3, label: "محصولات جانبی" },
    { value: 4, label: "آرایشی" },
  ];

  const handleChangeGroup = (value) => {
    setActiveGroup(value);
  
  };

  const getCategoryById = async () => {
    const { data } = await axios.get(
      `${path}/api/category/getCategoryById?id=${id}`
    );
   
    setCategory(data?.data?.title);
    setSteps(data?.data?.step);
    const group = {
      value:data?.data?.group?.id,
      label:data?.data?.group?.title
    }
    setActiveGroup(group)
   
  };

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

  const handleSubmitCategory = async () => {
    const data = {
      group:{
        id: parseInt(activeGroup?.value),
        title: activeGroup?.label
      },
      title: category,
      step: steps,
      categoryId:id
    };
    const res = await axios.put(
      `${path}/api/category/edit`,
      data
    );  
    navigate("/panel/category");
  };

  const handleRemoveStep = (title) => {
    const filterStep = steps.filter((item) => item.title !== title)
    setSteps(filterStep)
  }

  useEffect(() => {
    getCategoryById();
  }, [id]);

  return (
    <div>
      <Form
        fields={[
          {
            name: ["group"],
            value: activeGroup?.label,
          },
          {
            name: ["name"],
            value: category,
          },
          {
            name: ["step"],
            value: stepInp?.title,
          },
        ]}
      >
          <div className={style.descprofileLi}>
          <Typography.Title level={5}>انتخاب گروه</Typography.Title>
          <Form.Item
            name="group"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.productNameError,
              },
            ]}
          >
            <Select
              labelInValue
              onChange={handleChangeGroup}
              options={group}
              defaultValue={activeGroup}
            />
          </Form.Item>
        </div>
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
                  minWidth: "100px",
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
                      minWidth: "140px",
                      backgroundColor: "#000069",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: ".5rem",
                      position: "relative",
                    }}
                  >
                    <strong>{item?.title}</strong>
                    <CloseOutlined
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "11px",
                        right: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveStep(item?.title)}
                    />
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

export default EditCategory;
