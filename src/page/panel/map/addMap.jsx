import { Button, Divider, Form, Input, Typography } from "antd";
import { strings } from "../../../shared/language";
import style from "../../styles/panel.module.css";
import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectLocationOnMap from "../../../components/Map/selectedLoc";
import { path } from "../../../shared/config";

const AddMap = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  
  

  const handleTitle = (event) => {
    setTitle(event?.target?.value);
  };
  // const handleDesc = (event) => {
  //   setDesc(event?.target?.value);
  // };

  const handleSubmit = async () => {
    const data = {
      title: title,
      description: desc,
      latitude: lat,
      longitude: lng,
    };
    axios.post(`${path}/api/map/add`, data);
    navigate("/panel/map");
  };

  const handleLocationCoords = (data) => {
    console.log(data);
    setDesc(data?.result?.formatted_address)
    setLat(data?.lat)
    setLng(data?.lng)
  };


  

  return (
    <div>
      <Form>
        <div className={style.descprofileLi}>
          <Typography.Title level={5}>عنوان</Typography.Title>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.addressTitleError,
              },
            ]}
          >
            <Input
              name="title"
              type="text"
              value={title}
              onChange={handleTitle}
            />
          </Form.Item>
        </div>
        <div className={style.descprofileLi}>
        <Typography.Title level={5}>آدرس</Typography.Title>
          <SelectLocationOnMap handleLocationCoords={handleLocationCoords} />
        </div>
        {/* <div className={style.descprofileLi}>
          <Typography.Title level={5}>آدرس</Typography.Title>
          <Form.Item
            name="loc"
            rules={[
              {
                required: true,
                message: strings.profile.errorMessage.addressDescError,
              },
            ]}
          >
            <Input name="name" type="text" defaultValue={desc} value={desc} onChange={handleDesc} />
          </Form.Item>
        </div> */}
        <div style={{margin:"1.4rem 0"}}>{desc}</div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              width: "100px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleSubmit}
          >
            {strings.submit}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddMap;
