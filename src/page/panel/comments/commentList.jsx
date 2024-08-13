import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../../../shared/config";
import { strings } from "../../../shared/language";
import { dateFullFilter, shortText } from "../../../shared/utils";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";

const CommentList = () => {
  const [commentData, setCommentData] = useState();
  

  const getAllComments = async () => {
    const { data } = await axios.get(
      `${path}/api/comment/getAllNoResponseComment`
    );
    setCommentData(data?.data);
  };

  

  useEffect(() => {
    getAllComments();
  }, []);

  const columns = [
    {
      title: strings.panel.comment.username,
      dataIndex: "username",
      key: "username",
    },
    {
      title: strings.panel.comment.title,
      dataIndex: "title",
      key: "title",
      render: (_, record) => <div>{shortText(record?.title, 80)}</div>,
    },
    // {
    //   title: strings.panel.question.description,
    //   key: "description",
    //   render: (_, record) => (
    //     <div>
    //       {shortText(record?.description,80)}
    //     </div>
    //   )

    // },
    {
      title: strings.panel.comment.createdAt,
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
          <Link to={`./response/${record?._id}`}>
            <MessageOutlined
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={commentData} columns={columns} />
    </div>
  );
};

export default CommentList;
