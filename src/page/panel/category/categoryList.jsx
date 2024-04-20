import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const navigate = useNavigate()
  const [category, setCategories] = useState();
  const [update, setUpdate] = useState(false);

  const getAllCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/category/getAllCategory"
    );

    setCategories(data?.data);
  };

  const handleDelete = async (record) => {
    const res = await axios.delete(
      "http://localhost:8000/api/category/delete",
      { data: { categoryId: record?._id } }
    );
    setUpdate(!update)
  };


  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getAllCategory();
  }, [update]);

  const columns = [
    {
      title: strings.panel.category.title,
      dataIndex: "title",
      key: "title",
    },
    {
      title: strings.panel.blog.createdAt,
      key: "createdAt",
      render: (_, record) => (
        <Space size="middle">
           <div>
              {new Date(record?.createdAt).toString()}
           </div>
        </Space>
      ),
    },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
           <Link to={`/panel/category/edit/${record?._id}`}>
            <EditTwoTone
              style={{ fontSize: "1.2rem" }}
            />
          </Link>
          <Link>
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleDelete(record)}
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
          href="category/add"
          style={{ width: "100px" }}
        >
          {strings.add}
        </Button>
      </div>
      <Table dataSource={category} columns={columns} />
    </div>
  );
};

export default CategoryList;
