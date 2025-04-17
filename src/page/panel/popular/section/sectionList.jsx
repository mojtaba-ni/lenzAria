import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../../shared/language";
import axios from "axios";
import { DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/Modal";
import { path } from "../../../../shared/config";

const SectionList = () => {
  const [sectionData, setSectionData] = useState();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [update, setUpdate] = useState();
  const [record, setRecord] = useState();

  const getAllSection = async () => {
    try {
      const { data } = await axios.get(
        `${path}/api/section/getall`
      );

      setSectionData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteModal = (record) => {
    setShowRemoveModal(true)
   setRecord(record)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${path}/api/section/delete`, {
      data: { sectionId: id},
    });
    setShowRemoveModal(false)
    setUpdate(!update);
  };

  useEffect(() => {
    getAllSection();
  }, []);

  const columns = [
    {
      title: strings.panel.allUserPage.sectionTitle,
      dataIndex: "title",
      key: "title",
    },
    {
      title: strings.panel.allUserPage.categoryTitle,
      render: (_, record) => 
      <Space size="middle">
        <div>
              {record?.category?.title}
            </div>
      </Space>,
    },
    {
      title: strings.panel.allUserPage.stepTitle,
      render: (_, record) => 
      <Space size="middle">
        <div>
              {record?.step?.title}
            </div>
      </Space>,
    },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Link>
            <EditTwoTone
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleEdit(record)}
            />
          </Link> */}
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
        {
        showRemoveModal ?
          <CustomModal
            onOk={() => handleDelete(record?._id)}
            visible={showRemoveModal}
            onCancel={() => setShowRemoveModal(false)}
            text={"از حذف این بخش اطمینان دارید؟"}
            title={"حذف"}
          /> : null
      }
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
          href="popularSection/add"
          style={{ width: "100px" }}
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={sectionData} columns={columns} />
    </div>
  );
};

export default SectionList;
