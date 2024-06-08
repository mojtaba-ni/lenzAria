import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../../shared/language";
import axios from "axios";
import style from "../../../styles/panel/allUser/style.module.css";
import { dateFullFilter } from "../../../../shared/utils";

const PrSectionList = () => {
  const [sectionData, setSectionData] = useState();

  const getAllSection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/productSection/getall"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSection();
  }, []);

  const columns = [
    {
      title: strings.panel.allUserPage.username,
      dataIndex: "username",
      key: "username",
    },
    {
      title: strings.panel.allUserPage.phoneNumber,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: strings.panel.allUserPage.createdAt,
      dataIndex: "createdAt",
      render: (_, record) => (
        <Space size="middle">
            {dateFullFilter(record?.createdAt)}
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

export default PrSectionList;
