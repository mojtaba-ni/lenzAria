import { Button, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toBase64 } from "../../../../shared/utils";
import axios from "axios";
import style from "../../../styles/product/style.module.css";
import { strings } from "../../../../shared/language";
import { path } from "../../../../shared/config";

const AddMainBanner = () => {
    const navigate = useNavigate()
    const [banner, setBanner] = useState(null)
   

  

     
      const handleFileChange = (e) => {
        if (e.target.files) {
            setBanner(e.target.files[0]);
        }
     
      };

      const handleSubmit = async() => {
        const pic =  await toBase64(banner)
        const data = {
            image: pic
        }
        const res = await axios.post(`${path}/api/mainBanner/add` , data )
        
        navigate('/panel/mainBanner')
      }
  return (
    <div>
      <Form>
      
       
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>عکس محصول</Typography.Title>
          <Form.Item    name="file"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.uploadError,
              },
            ]}>
         
        <input id="file" type="file" onChange={handleFileChange} />
        </Form.Item>
       
      </div>
      {banner && (
        <section>
          جزیات عکس:
          <ul>
            <li>Name: {banner.name}</li>
            <li>Type: {banner.type}</li>
            <li>Size: {banner.size} bytes</li>
          </ul>
        </section>
      )}
      
       
         
       
        <div
          style={{
            width: "100%",
            justifyContent: "end",
            alignItems:"center",
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

export default AddMainBanner;
