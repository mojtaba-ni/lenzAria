import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import { strings } from "../../../../shared/language";
import CustomModal from "../../../../components/Modal";
import { dateFullFilter } from "../../../../shared/utils";
import { path } from "../../../../shared/config";

const MainBannerList = () => {
  const [baner, setBaner] = useState();
  const [update, setUpdate] = useState();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [record, setRecord] = useState();

  const getAllMainBanner = async () => {
    const { data } = await axios.get(`${path}/api/mainBanner/all`);
    if (!data?.isSuccess) return;
    setBaner(data?.data);
  };

  const handleDeleteModal = (record) => {
    setShowRemoveModal(true)
    setRecord(record)
  }

  const handleDeleteBanner = async (id) => {
    const res = await axios.delete(`${path}/api/mainBanner/delete`, {
      data: { bannerId: id },
    });

    setUpdate(!update);
    setShowRemoveModal(false);
  };

  

  useEffect(() => {
    getAllMainBanner();
  }, []);
  useEffect(() => {
    getAllMainBanner();
  }, [update]);

  const columns = [
    {
      title: " عکس بنر",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
         <img src={record?.image} width={100} />
        </Space>
      ),
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
            onOk={() => handleDeleteBanner(record?._id)}
            visible={showRemoveModal}
            onCancel={() => setShowRemoveModal(false)}
            text={"از حذف بنز خود اطمینان دارید؟"}
            title={"حذف  بنز"}
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
          href="mainBanner/add"
          style={{ width: "100px" }}
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={baner} columns={columns} />
    </div>
  );
};

export default MainBannerList;
