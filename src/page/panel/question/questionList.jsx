import { Button, Space, Table } from 'antd'
import  { useEffect, useState } from 'react'
import { strings } from '../../../shared/language'
import { DeleteTwoTone } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dateFullFilter, shortText } from '../../../shared/utils';
import { path } from '../../../shared/config';


const QuestionList = () => {
    const [questionData, setQuestionData] = useState();
    const [update, setUpdate] = useState(false);

    const getAllQuestion = async () => {
        const { data } = await axios.get(
          `${path}/api/question/getAllQuestion`
        );
        setQuestionData(data?.data);
      };
      const handleDelete = async (id) => {
        const res = await axios.delete(`${path}/api/brand/delete`, {
          data: { brandId: id},
        });
    
        setUpdate(!update);
      };

      useEffect(() => {
        getAllQuestion()
      }, [update])
      
    const columns = [
        {
          title: strings.panel.question.title,
          dataIndex: "title",
          key: "title",
        },
        {
          title: strings.panel.question.description,
          key: "description",
          render: (_, record) => (
            <div>
              {shortText(record?.description,80)}
            </div>
          )

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
                  onClick={() => handleDelete(record?._id)}
                />
              </Link>
            </Space>
          ),
        },
      ];
   
  return (
    <div>
      <div style={{display:"flex" , alignItems:"center" , justifyContent:"end", margin:"1.5rem .5rem" }}>
        <Button type="primary" size="large" href="questions/add" style={{width:"100px"}}>{strings.add}</Button>
      </div>
      <Table dataSource={questionData} columns={columns} />
    </div>
  )
}

export default QuestionList