import { Button, Space, Table } from 'antd'
import  { useEffect, useState } from 'react'
import { strings } from '../../../shared/language'
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import axios from 'axios';


const QuestionList = () => {
    const [blog, setBlog] = useState();
    const [update, setUpdate] = useState(false);
    const geyAllBlog = async () => {
        const { data } = await axios.get(
          "http://localhost:8000/api/blog/getAllBlogs"
        );
    
        setBlog(data?.data);
      };

      useEffect(() => {
        geyAllBlog()
      }, [])
      
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
                  onClick={() => handleDelete(record)}
                />
              </Link>
            </Space>
          ),
        },
      ];
   
  return (
    <div>
      <div style={{display:"flex" , alignItems:"center" , justifyContent:"end", margin:"1.5rem .5rem" }}>
        <Button type="primary" size="large" href="question/add" style={{width:"100px"}}>{strings.add}</Button>
      </div>
      <Table dataSource={blog} columns={columns} />
    </div>
  )
}

export default QuestionList