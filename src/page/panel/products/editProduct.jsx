import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { strings } from "../../../shared/language";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toBase64 } from "../../../shared/utils";
import axios from "axios";
import style from "../../styles/product/style.module.css";
import { path } from "../../../shared/config";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    name: null,
    description: null,
    Specifications: null,
    price: null,
    productId: null,
    count: null,
  });

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [step, setStep] = useState([]);
  const [img, setImg] = useState(null);
  const [lenzImg, setLenzImg] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activePeriod, setActivePeriod] = useState(null);
  const [brand, setBrand] = useState(null);
  const [lenzFile, setLenzFile] = useState(null);

  const period = [
    { value: 1, label: "روزانه" },
    { value: 2, label: "ماهانه" },
    { value: 3, label: "فصلی" },
    { value: 4, label: "سالانه" },
  ];

  const handleLenzFileChange = (e) => {
    if (e.target.files) {
      setLenzFile(e.target.files[0]);
      setLenzImg(null);
    }
  };

  const handleProductForm = (event, name) => {
    setProductForm((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setImg(null)
    }
  };

  const handleChange = (value) => {
  
    setActiveCategory(value);
  };
  const handleChangeStep = (value) => {
    setActiveStep(value);
  };
  const handleChangeBrand = (value) => {
    setActiveBrand(value);
  };
  const handleChangePeriod = (value) => {
    setActivePeriod(value);
  };

  const handleSubmit = async () => {
    var lenz = null
    if(lenzFile){
      lenz = await toBase64(lenzFile);
    }
    const data = {
      productId:productForm?.productId,
      step:{
        id:activeStep?.value,
        title:activeStep?.label,
      },
      category:{
        id:activeCategory?.value,
        title:activeCategory?.label,
      },
      name: productForm?.name,
      Specifications: productForm?.Specifications,
      brand:{
        id: activeBrand?.value,
        title: activeBrand?.label,
      },
      period:activePeriod.label,
      periodId:activePeriod.value,
      description: productForm?.description,
      price: parseInt(productForm?.price),
      image:img ? img :  await toBase64(file),
      imageLenz: lenz
    };
    
    const res = await axios.put(
      `${path}/api/product/update`,
      data
    );
    navigate("/panel/product");
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
  const getAllBrand = async() => {
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
    
    setBrand(brandList)
  }

  const getAllSteps = async (activeCt) => {
    const { data } = await axios.get(
      `${path}/api/step/getAllStep`,
      {
        params: { id: activeCt?.value},
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

  const getProductDataById = async () => {
    const { data } = await axios.get(
      `${path}/api/product/getById?id=${id}`
    );
    setProductForm({
      Specifications: data?.data?.Specifications,
      description: data?.data?.description,
      name: data?.data?.name,
      price: data?.data?.price,
      productId: data?.data?._id,
      count: data?.data?.count,
    });
    setActiveStep({ label : data?.data?.step?.title , value : data?.data?.step?.id})
    setActiveCategory({ label : data?.data?.category?.title , value : data?.data?.category?.id})
    setImg(data?.data?.image);
    setLenzImg(data?.data?.imageLenz);
  };

  useEffect(() => {
    getProductDataById();
    getAllCategory();
    getAllBrand()
  }, []);
  useEffect(() => {
    if (activeCategory) {
      getAllSteps(activeCategory);
    }
  }, [activeCategory , id]);
  return (
    <div>
      <Form
        fields={[
          {
            name: ["name"],
            value: productForm?.name,
          },
          {
            name: ["description"],
            value: productForm?.description,
          },
          {
            name: ["Specifications"],
            value: productForm?.Specifications,
          },
          {
            name: ["price"],
            value: productForm?.price,
          },
        ]}
      >
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
                  defaultValue={
                    {
                      label: activeCategory?.label,
                      value: activeCategory?.value,
                    }
                  }
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
                  defaultValue={activeCategory}
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
              value={productForm?.description}
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
              maxLength={300}
              value={productForm?.Specifications}
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
              value={productForm?.price}
              onChange={(e) => handleProductForm(e, "price")}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>تعداد</Typography.Title>
          <Form.Item
            name="count"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.numberError,
              },
            ]}
          >
            <Input
              placeholder="..."
              name="count"
              value={productForm?.price}
              onChange={(e) => handleProductForm(e, "count")}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>عکس محصول</Typography.Title>
          <Form.Item
            name="file"
            rules={[
              {
                required: (file || img)? false : true,
                message: strings.profile.errorMessage.uploadError,
              },
            ]}
          >
            <input id="file" type="file" onChange={handleFileChange} />
          </Form.Item>
        </div>
        {(file || img) &&  (
          <section>
            جزیات عکس:
            <img src={file || img} alt="image" width={200} />
          </section>
        )}
             <div className={style.descprofileLi}>
          <Typography.Title level={5}>عکس لنز</Typography.Title>
          <Form.Item
            name="file"
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
        {(file || lenzImg)  &&(
          <section>
            جزیات عکس:
            <img src={file || lenzImg} alt="image" width={200} />
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

export default EditProduct;
