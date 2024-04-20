import { Button, Space, Table, Modal, Input, Typography, Form } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";

const Brand = () => {
  const [brand, setBrand] = useState();
  const [newBrand, setNewBrand] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const geyAllBrand = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/brand/getAllBrand"
    );

    setBrand(data?.data);
  };

  const handleAddBrand = async () => {
    if (newBrand) {
      const res = await axios.post("http://localhost:8000/api/brand/add", {
        name: newBrand,
      });
    }
    hideModal();
    setUpdate(!update);
  };
  const handleDeleteBrand = async (record) => {
    const res = await axios.delete("http://localhost:8000/api/brand/delete", 
    { data: { brandId: record?._id } });

    setUpdate(!update);
  };
  useEffect(() => {
    geyAllBrand();
  }, []);

  useEffect(() => {
    geyAllBrand();
  }, [update]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: strings.panel.brand.brandTitle,
      dataIndex: "name",
      key: "name",
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
          <Link>
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleDeleteBrand(record)}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title={strings.brand.addTitle}
        open={isModalOpen}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <div
            key={1}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "end",
            }}
          >
            <Button
              key="back"
              danger
              onClick={hideModal}
              style={{ width: "75px" }}
            >
              لغو
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleAddBrand}
              style={{ width: "75px" }}
            >
              ثبت
            </Button>
          </div>,
        ]}
      >
        <Form style={{ display: "flex", marginTop: "1.3rem" }}>
          <Typography.Title level={5} style={{ width: "100px" }}>
            نام برند
          </Typography.Title>
          <Form.Item
            name="brandName"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.numberError,
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input onChange={(e) => setNewBrand(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
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
          style={{ width: "100px" }}
          onClick={showModal}
          htmlType="submit"
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={brand} columns={columns} />
    </div>
  );
};

export default Brand;
