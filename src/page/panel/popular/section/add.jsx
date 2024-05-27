import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { strings } from "../../../../shared/language";
import style from "../../../styles/product/style.module.css";
import { useEffect, useState } from "react";
import { toBase64 } from "../../../../shared/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSection = () => {

    const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [step, setStep] = useState([]);
  const [category, setCategory] = useState([]);
  const [sectionTitle, setSectionTitle] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const handleChange = (value) => {
    setActiveCategory(value);
  };
  const handleChangeStep = (value) => {
    setActiveStep(value);
  };
  const handleChangTitle = (value) => {
    setSectionTitle(value);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const getAllCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/category/getAllCategory"
    );

    const categoryList = [];
    data?.data.forEach((element) => {
      const categorLi = {
        label: element?.title,
        value: element?._id,
      };
      categoryList.push(categorLi);
    });
    setCategory(categoryList);
  };
  const getAllSteps = async (activeCt) => {
    const { data } = await axios.get(
      "http://localhost:8000/api/step/getAllStep",
      {
        params: { id: activeCt?.value },
      }
    );
    const stepList = [];
    data?.data.forEach((element) => {
      const categorLi = {
        label: element?.title,
        value: element?._id,
      };
      stepList.push(categorLi);
    });
    setStep(stepList);
  };

  const handleSubmit = async() => {
    const pic = await toBase64(file);
    const data = {
        step: {
          id: activeStep?.value,
          title: activeStep?.label,
        },
        category: {
          id: activeCategory?.value,
          title: activeCategory?.label,
        },
        title:sectionTitle,
        image: pic,
    }
    await axios.post("http://localhost:8000/api/section/add")
    navigate("/panel/popularSection");
  }

   //Effect
   useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    if (activeCategory) {
      getAllSteps(activeCategory);
    }
  }, [activeCategory]);

  return (
    <div>
      <Form>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>عنوان</Typography.Title>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.titleError,
              },
            ]}
          >
            <Input
              placeholder="..."
              name="name"
              onChange={(e) => handleChangTitle(e)}
            />
          </Form.Item>
        </div>
        <Row gutter={20}>
          <Col
            sm={{
              span: 12,
            }}
            span={6}
          >
            <div className={style.descprofileLi}>
              <Typography.Title level={5}>انتخاب دسته</Typography.Title>
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.categoryError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChange}
                  options={category}
                  defaultValue={activeCategory}
                />
              </Form.Item>
            </div>
          </Col>
          <Col
            sm={{
              span: 12,
            }}
            span={6}
          >
            <div className={style.descprofileLi}>
              <Typography.Title level={5}>انتخاب زیردسته</Typography.Title>
              <Form.Item
                name="step"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.stepError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChangeStep}
                  options={step}
                  defaultValue={activeStep}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <div className={style.descprofileLi}>
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
            <input id="file" type="file" onChange={handleFileChange} />
          </Form.Item>
        </div>
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
           <div
          style={{
            width: "100%",
            justifyContent: "end",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            type="primary"
            block
            className={style.descProfileBtn}
            onClick={handleSubmit}
            htmlType="submit"
          >
            {strings.submit}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddSection;
