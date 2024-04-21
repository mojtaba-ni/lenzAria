import { Space, Table, Button } from "antd";
import axios from "axios";
import { strings } from "../../../shared/language";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModal from "../../../components/Modal";

// import { useEffect, useState } from "react";

const BlogList = () => {
  const [blog, setBlog] = useState();
  const [update, setUpdate] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [record, setRecord] = useState();
  const geyAllBlog = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/blog/getAllBlogs"
    );

    setBlog(data?.data);
  };
  const handleEdit = async (id) => {
    const res = await axios.put();
  };
  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      "http://localhost:8000/api/blog/delete",
      { data: { blogId: id} }
    );
    setShowRemoveModal(false)
    if (data.isSuccess) {
      setUpdate(!update);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    
  };

  const handleDeleteModal = (record) => {
    setShowRemoveModal(true)
    setRecord(record)
  }

  useEffect(() => {
    geyAllBlog();
  }, [update]);
  const columns = [
    {
      title: strings.panel.blog.blogTitle,
      dataIndex: "blogTitle",
      key: "blogTitle",
    },
    {
      title: strings.panel.blog.introduction,
      dataIndex: "introduction",
      key: "introduction",
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
            <EditTwoTone
              style={{ fontSize: "1.2rem" }}
              onClick={() => handleEdit(record)}
            />
          </Link>
          <Link>
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: "1.2rem" }}
              // onClick={() => handleDelete(record)}
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
            text={"از حذف وبلاگ خود اطمینان دارید؟"}
            title={"حذف بلاگ"}
          /> : null
      }
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end", margin: "1.5rem .5rem" }}>
        <Button type="primary" size="large" href="blog/add" style={{ width: "100px" }}>{strings.add}</Button>
      </div>
      <Table dataSource={blog} columns={columns} />
    </div>
  );
};

export default BlogList;
