import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { strings } from "../../../shared/language";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toBase64 } from "../../../shared/utils";
import axios from "axios";
import style from "../../styles/product/style.module.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    name: null,
    description: null,
    Specifications: null,
    price: null,
  });
  const [file, setFile] = useState(null);
  const [step, setStep] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [stepId, setStepId] = useState(null);
  console.log({stepId});
  const handleProductForm = (event, name) => {
    setProductForm((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
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

  const handleSubmit = async () => {
    const pic = await toBase64(file);
    const data = {
      stepId,
      categoryId,
      name: productForm?.name,
      Specifications: productForm?.Specifications,
      description: productForm?.description,
      price: parseInt(productForm?.price),
      image: pic,
    };
    const res = await axios.post("http://localhost:8000/api/product/add", data);
    console.log({ res });
    navigate("/panel/product");
  };

  const getAllSteps = async (id) => {
    const {data} = await axios.get("http://localhost:8000/api/step/getAllStep", {
      params: { id },
    });
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

  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setCategoryId(value?.value);
  };
  const handleChangeStep = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setStepId(value?.value);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    if (categoryId) {
      getAllSteps(categoryId);
    }
  }, [categoryId]);

  return (
    <div>
      <Form>
        <Row gutter={20}>
          <Col
            sm={{
              span: 12,
            }}
            span={6}
          >
            <div className={style.descprofileLi}>
              <Typography.Title level={5}>اسم دسته</Typography.Title>
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.productNameError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChange}
                  options={category}
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
              <Typography.Title level={5}>اسم زیر دسته</Typography.Title>
              <Form.Item
                name="step"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.productNameError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChangeStep}
                  options={step}
                  disabled={!step}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div className={style.descprofileLi}>
          <Typography.Title level={5}>اسم محصول</Typography.Title>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.productNameError,
              },
            ]}
          >
            <Input
              placeholder="..."
              name="name"
              onChange={(e) => handleProductForm(e, "name")}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>توضیحات </Typography.Title>

          <Form.Item
            style={{ width: "100%" }}
            name="description"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.descriptionError,
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={120}
              placeholder="..."
              style={{
                height: 120,
                resize: "none",
              }}
              name="description"
              onChange={(e) => handleProductForm(e, "description")}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>مشخصات فنی </Typography.Title>

          <Form.Item
            style={{ width: "100%" }}
            name="Specifications"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.SpecificationsError,
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={120}
              placeholder="..."
              style={{
                height: 120,
                resize: "none",
              }}
              name="Specifications"
              onChange={(e) => handleProductForm(e, "Specifications")}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>قیمت (تومان)</Typography.Title>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.numberError,
              },
            ]}
          >
            <Input
              placeholder="..."
              name="price"
              onChange={(e) => handleProductForm(e, "price")}
            />
          </Form.Item>
        </div>
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

export default AddProduct;
