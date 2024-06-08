import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";
import { DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { dateFullFilter, shortText } from "../../../shared/utils";
import CustomModal from "../../../components/Modal";

const MapList = () => {
  const [mapData, setMapData] = useState();
  const [update, setUpdate] = useState(false);
  const [record, setRecord] = useState();
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleDeleteModal = (record) => {
    setShowRemoveModal(true);
    setRecord(record);
  };
  const handleDeleteMap = async (id) => {
    const res = await axios.delete("http://localhost:8000/api/map/delete", {
      data: { mapId: id },
    });

    setUpdate(!update);
    setShowRemoveModal(false);
  };

  const getAllMap = async () => {
    const { data } = await axios.get("http://localhost:8000/api/map/getAllMap");
    setMapData(data?.data);
  };


  useEffect(() => {
    getAllMap();
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
      render: (_, record) => <div>{shortText(record?.description, 80)}</div>,
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
      {showRemoveModal ? (
        <CustomModal
          onOk={() => handleDeleteMap(record?._id)}
          visible={showRemoveModal}
          onCancel={() => setShowRemoveModal(false)}
          text={"از حذف لوکیشن اطمینان دارید؟"}
          title={"حذف لوکیشن"}
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
        <Link to={"add"}>
          <Button type="primary" size="large" style={{ width: "100px" }}>
            {strings.add}
          </Button>
        </Link>
      </div>
      <Table dataSource={mapData} columns={columns} />
    </div>
  );
};

export default MapList;
