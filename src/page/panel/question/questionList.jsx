import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { dateFullFilter, shortText } from "../../../shared/utils";
import { path } from "../../../shared/config";
import { toast } from "react-toastify";
import CustomModal from "../../../components/Modal";

const QuestionList = () => {
  const [questionData, setQuestionData] = useState();
  const [update, setUpdate] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [record, setRecord] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  const [editForm] = Form.useForm();
  const getAllQuestion = async () => {
    const { data } = await axios.get(`${path}/api/question/getAllQuestion`);
    setQuestionData(data?.data);
  };
  const handleDeleteModal = (record) => {
    setShowRemoveModal(true);
    setRecord(record);
  };
  const handleEditModal = (record) => {
    setShowEditModal(true);
    setRecord(record);
    editForm.setFieldsValue({
      editTitle: record?.title,
      editDescription: record?.description,
    });
  };
  const hideEditModal = () => {
    setShowEditModal(false);
    editForm.resetFields();
  };
  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields();
      const { data } = await axios.put(`${path}/api/question/edit`, {
        questionId: record?._id,
        title: values.editTitle,
        description: record?.description,
      });
      if (data?.isSuccess) {
        toast.success(data?.message);
        setUpdate(!update);
        setShowEditModal(false);
        editForm.resetFields();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`${path}/api/question/delete`, {
      data: { questionId: id },
    });
    if (data?.isSuccess) {
      toast.success(data?.message);
      setUpdate(!update);
      setShowRemoveModal(false);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    getAllQuestion();
  }, [update]);

  const columns = [
    {
      title: strings.panel.question.title,
      dataIndex: "title",
      key: "title",
    },
    {
      title: strings.panel.question.description,
      key: "description",
      render: (_, record) => <div>{shortText(record?.description, 60)}</div>,
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
            <EditTwoTone
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleEditModal(record)}
            />
          </Link>
          <Link>
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleDeleteModal(record?._id)}
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
          onOk={() => handleDelete(record)}
          visible={showRemoveModal}
          onCancel={() => setShowRemoveModal(false)}
          text={"از حذف سوال اطمینان دارید؟"}
          title={"حذف سوال"}
        />
      ) : null}
      {showEditModal && (
        <Modal
          title={strings.brand.editTitle}
          open={showEditModal}
          onOk={handleEdit}
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
                onClick={handleEdit}
                style={{ width: "75px" }}
              >
                ثبت
              </Button>
            </div>,
          ]}
        >
          <Form form={editForm}>
            <Typography.Title level={5} style={{ width: "100px" }}>
              عنوان
            </Typography.Title>
            <Form.Item
              name="editTitle"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.brandNameError,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="editDescription"
              rules={[
                {
                  required: true,
                  message: strings.profile.errorMessage.brandNameError,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Typography.Title level={5} style={{ width: "100px" }}>
                توضیحات
              </Typography.Title>
              <Input.TextArea
                rows={7}
                value={record?.description}
                onChange={(e) =>
                  setRecord({ ...record, description: e.target.value })
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
          href="questions/add"
          style={{ width: "100px" }}
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={questionData} columns={columns} />
    </div>
  );
};

export default QuestionList;
