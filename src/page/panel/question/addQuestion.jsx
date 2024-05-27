import { Form, Typography, Button , Input  } from "antd";
import { strings } from "../../../shared/language";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toBase64 } from "../../../shared/utils";
import axios from "axios";
import style from "../../styles/product/style.module.css";

const AddQuestion = () => {
  const navigate = useNavigate();

  const [Qfile, setQfile] = useState(null);
  const [Qtitle, setQtitle] = useState(null);
  const [Qdescription, setQdescription] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setQfile(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    const pic = await toBase64(Qfile);
    const data = {
      title:Qtitle,
      description:Qdescription,
      image: pic,
    };
   await axios.post(
      "http://localhost:8000/api/question/add",
      data
    );
    navigate("/panel/questions");
  };

  return (
    <div>
      <Form>
        <div className={style.descprofileLi}>
          <Typography.Title level={5} style={{ width: "100px" }}>
            عنوان
          </Typography.Title>
          <Form.Item
            name="questionTitle"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.titleError,
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input onChange={(e) => setQtitle(e.target.value)} />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5} style={{ width: "100px" }}>
            توضیحات
          </Typography.Title>
          <Form.Item
            name="questionDescription"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.descriptionError,
              },
            ]}
            style={{ width: "100%" }}
          >
            <TextArea rows={4}  onChange={(e) => setQdescription(e.target.value)} />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>عکس محصول</Typography.Title>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.uploadError,
              },
            ]}
          >
            <input id="file" type="file" onChange={handleFileChange} />
          </Form.Item>
        </div>
        <div
          style={{
            width: "100%",
            justifyContent: "end",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            type="primary"
            block
            className={style.descProfileBtn}
            onClick={handleSubmit}
            htmlType="submit"
          >
            {strings.submit}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddQuestion;
