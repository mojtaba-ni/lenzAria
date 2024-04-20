import { Button, Space, Table } from "antd";
import { strings } from "../../../shared/language";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const ProductList = () => {
  const [product, setProduct] = useState();
  const [update, setUpdate] = useState();
  const navigate = useNavigate();

  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:8000/api/product");
    if (!data?.isSuccess) return;
    setProduct(data?.data);
  };
  const handleDeleteProduct = async (record) => {
    const res = await axios.delete("http://localhost:8000/api/product/delete", {
      data: { productId: record?._id },
    });

    setUpdate(!update);
  };

  

  useEffect(() => {
    getAllProduct();
  }, []);
  useEffect(() => {
    getAllProduct();
  }, [update]);

  const columns = [
    {
      title: strings.panel.product.name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: strings.panel.product.price,
      dataIndex: "price",
      key: "price",
    },
    {
      title: strings.panel.blog.createdAt,
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/panel/product/edit/${record?._id}`}>
            <EditTwoTone style={{ fontSize: "1.2rem" }} />
          </Link>
          <Link>
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleDeleteProduct(record)}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          margin: "1.5rem .5rem",
        }}
      >
        <Button
          type="primary"
          size="large"
          href="product/add"
          style={{ width: "100px" }}
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={product} columns={columns} />
    </div>
  );
};

export default ProductList;
