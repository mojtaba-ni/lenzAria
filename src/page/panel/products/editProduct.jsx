import { Button, Form, Input, Typography } from "antd";
import { strings } from "../../../shared/language";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toBase64 } from "../../../shared/utils";
import axios from "axios";
import style from "../../styles/product/style.module.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    name: null,
    description: null,
    Specifications: null,
    price: null,
  });
  console.log({ productForm });
  const [file, setFile] = useState(null);

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

  const handleSubmit = async () => {
    const pic = await toBase64(file);
    const data = {
      name: productForm?.name,
      Specifications: productForm?.Specifications,
      description: productForm?.description,
      price: parseInt(productForm?.price),
      image: pic,
    };
    const res = await axios.put("http://localhost:8000/api/product/update", data);
    console.log({ res });
    navigate("/panel/product");
  };

  const getProductDataById = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/product/getById?id=${id}`
    );
    setProductForm({
      Specifications: data?.data?.Specifications,
      description: data?.data?.description,
      name: data?.data?.name,
      price: data?.data?.price,
    });
    setFile(data?.data?.image);
  };

  useEffect(() => {
    getProductDataById();
  }, []);

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
              maxLength={120}
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
            <img src={file} alt="image" width={200} />
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
