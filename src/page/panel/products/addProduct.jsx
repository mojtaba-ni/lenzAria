import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { strings } from "../../../shared/language";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toBase64 } from "../../../shared/utils";
import axios from "axios";
import style from "../../styles/product/style.module.css";
import { path } from "../../../shared/config";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    name: null,
    description: null,
    Specifications: null,
    price: null,
  });
 
  const [file, setFile] = useState(null);
  const [lenzFile, setLenzFile] = useState(null);
  const [step, setStep] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activePeriod, setActivePeriod] = useState(null);
  

  const period = [
    { value: 1, label: "روزانه" },
    { value: 2, label: "ماهانه" },
    { value: 3, label: "فصلی" },
    { value: 4, label: "سالانه" },
  ];


  const handleProductForm = (event, name) => {
    setProductForm((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e?.target?.files[0]);
    }
  };

  const handleLenzFileChange = (e) => {
    if (e.target.files) {
      setLenzFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const pic = await toBase64(file);
    var lenz = null
    if(lenzFile){
      lenz = await toBase64(lenzFile);
    }
   
    const data = {
   
      step: {
        id: activeStep?.value,
        title: activeStep?.label,
      },
      category: {
        id: activeCategory?.value,
        title: activeCategory?.label,
      },
      name: productForm?.name,
      Specifications: productForm?.Specifications,
      description: productForm?.description,
      brand: {
        id: activeBrand?.value,
        title: activeBrand?.label,
      },
      period: activePeriod.label,
      periodId: activePeriod.value,
      price: parseInt(productForm?.price),
      image: pic,
      lenzImage: lenz ? lenz : null 

    };
    await axios.post(`${path}/api/product/add`, data);
    navigate("/panel/product");
  };

  const handleChange = (value) => {
    setActiveCategory(value);
  };
  const handleChangeBrand = (value) => {
    setActiveBrand(value);
  };
  const handleChangePeriod = (value) => {
    setActivePeriod(value);
  };
  const handleChangeStep = (value) => {
    setActiveStep(value);
  };

  const getAllBrand = async () => {
    const { data } = await axios.get(
      `${path}/api/brand/getAllBrand`
    );
    const brandList = [];
    data?.data.forEach((element) => {
      const brandLi = {
        label: element?.name,
        value: element?._id,
      };
      brandList.push(brandLi);
    });

    setBrand(brandList);
  };
  const getAllCategory = async () => {
    const { data } = await axios.get(
      `${path}/api/category/getAllCategory`
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
      `${path}/api/step/getAllStep`,
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

  //Effect
  useEffect(() => {
    getAllCategory();
    getAllBrand();
  }, []);
  useEffect(() => {
    if (activeCategory) {
      getAllSteps(activeCategory);
    }
  }, [activeCategory]);

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
              <Typography.Title level={5}>انتخاب دسته</Typography.Title>
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
              <Typography.Title level={5}>انتخاب زیر دسته</Typography.Title>
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
                  defaultValue={activeStep}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col
            sm={{
              span: 12,
            }}
            span={6}
          >
            <div className={style.descprofileLi}>
              <Typography.Title level={5}> انتخاب برند</Typography.Title>
              <Form.Item
                name="brand"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.productNameError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChangeBrand}
                  options={brand}
                  defaultValue={activeBrand}
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
              <Typography.Title level={5}>دوره مصرف</Typography.Title>
              <Form.Item
                name="period"
                rules={[
                  {
                    required: true,
                    message: strings.profile.errorMessage.productNameError,
                  },
                ]}
              >
                <Select
                  labelInValue
                  onChange={handleChangePeriod}
                  options={period}
                  defaultValue={activePeriod}
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
              maxLength={1000}
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
              maxLength={500}
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
          <div className={style.descprofileLi}>
          <Typography.Title level={5}>عکس لنز</Typography.Title>
          <Form.Item
            name="lenzFile"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.uploadError,
              },
            ]}
          >
            <input id="lenzFile" type="file" onChange={handleLenzFileChange} />
          </Form.Item>
        </div>
        {lenzFile && (
          <section>
            جزیات عکس:
            <ul>
              <li>Name: {lenzFile?.name}</li>
              <li>Type: {lenzFile?.type}</li>
              <li>Size: {lenzFile?.size} bytes</li>
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
