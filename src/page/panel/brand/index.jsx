import { Button, Space, Table, Modal, Input, Typography, Form } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import CustomModal from "../../../components/Modal";
import { dateFullFilter } from "../../../shared/utils";
import { path } from "../../../shared/config";
import { toast } from "react-toastify";

const Brand = () => {
  const [brand, setBrand] = useState();
  const [newBrand, setNewBrand] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [record, setRecord] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const [editForm] = Form.useForm();

  const hideEditModal = () => {
    setIsEditModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const geyAllBrand = async () => {
    const { data } = await axios.get(`${path}/api/brand/getAllBrand`);
    setBrand(data?.data);
  };

  const handleAddBrand = async () => {
    if (newBrand) {
      const res = await axios.post(`${path}/api/brand/add`, {
        name: newBrand,
      });
    }
    toast.success(res?.data?.message);
    hideModal();
    setUpdate(!update);
  };

  const handleDeleteModal = (record) => {
    setShowRemoveModal(true);
    setRecord(record);
  };
  const handleEditModal = (record) => {
    setIsEditModalOpen(true);
    setEditRecord(record);
  };

  const handleDeleteBrand = async (id) => {
    const res = await axios.delete(`${path}/api/brand/delete`, {
      data: { brandId: id },
    });
    toast.success(res?.data?.message);
    setUpdate(!update);
    setShowRemoveModal(false);
  };

  const handleEdit = async (record) => {
    const values = await editForm.validateFields();
    const res = await axios.put(`${path}/api/brand/update`, {
      brandId: record,
      name: values?.editBrand,
    });
    if (res?.data?.isSuccess) {
      toast.success(res?.data?.message);
      setUpdate(!update);
      setIsEditModalOpen(false);
      setEditRecord(null);
      editForm.resetFields();
    } else {
      toast.error(res?.data?.message);
    }
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
      render: (_, record) => (
        <Space size="middle">{dateFullFilter(record?.createdAt)}</Space>
      ),
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
              onClick={() => handleDeleteModal(record)}
            />
          </Link>
          <Link>
            <EditTwoTone
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleEditModal(record)}
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
          onOk={() => handleDeleteBrand(record?._id)}
          visible={showRemoveModal}
          onCancel={() => setShowRemoveModal(false)}
          text={"از حذف برند اطمینان دارید؟"}
          title={"حذف برند"}
        />
      ) : null}
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
      {isEditModalOpen && (
        <Modal
          title={strings.brand.editTitle}
          open={isEditModalOpen}
          onOk={() => handleEdit(editRecord?._id)}
          onCancel={hideEditModal}
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
                onClick={hideEditModal}
                style={{ width: "75px" }}
              >
                لغو
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={() => handleEdit(editRecord?._id)}
                style={{ width: "75px" }}
              >
                ثبت
              </Button>
            </div>,
          ]}
        >
          <Form form={editForm}>
            <Typography.Title level={5} style={{ width: "100px" }}>
              نام برند
            </Typography.Title>
            <Form.Item
              name="editBrand"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.brandNameError,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input
                value={editRecord?.name}
                onChange={(e) =>
                  setEditRecord({ ...editRecord, name: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
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
