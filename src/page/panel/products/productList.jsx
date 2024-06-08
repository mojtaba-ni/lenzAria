import { Button, Space, Table } from "antd";
import { strings } from "../../../shared/language";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import CustomModal from "../../../components/Modal";
import { dateFullFilter } from "../../../shared/utils";


const ProductList = () => {
  const [product, setProduct] = useState();
  const [update, setUpdate] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [record, setRecord] = useState();


  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:8000/api/product");
    if (!data?.isSuccess) return;
    setProduct(data?.data);
  };

  const handleDeleteModal = (record) => {
    setShowRemoveModal(true)
    setRecord(record)
  }
  
  const handleDeleteProduct = async (id) => {
    const res = await axios.delete("http://localhost:8000/api/product/delete", {
      data: { productId: id },
    });

    setUpdate(!update);
    setShowRemoveModal(false)
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  useEffect(() => {
    if (product) {
      getAllProduct();  
    }
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
      render: (_, record) => (
        <Space size="middle">
            {dateFullFilter(record?.createdAt)}
        </Space>
        ),
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
              onClick={() => handleDeleteModal(record)}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
       {showRemoveModal ? (
        <CustomModal
          onOk={() => handleDeleteProduct(record?._id)}
          visible={showRemoveModal}
          onCancel={() => setShowRemoveModal(false)}
          text={"از حذف محصول اطمینان دارید؟"}
          title={"حذف محصول"}
        />
      ) : null}
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
