import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, Spin, Modal, Select, Typography } from "antd";
import style from "../styles/lenzTest/style.module.css";
import axios from "axios";
import { toBase64 } from "../../shared/utils";
import { strings } from "../../shared/language";
import { LoadingOutlined } from "@ant-design/icons";
import videoIc from "../../assets/images/images.png";
import { path } from "../../shared/config";

const LenzTest = () => {
  const [file, setFile] = useState();

  const [chosenPr, setChosenPr] = useState();
  const [product, setProduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const getAllLenzProduct = async () => {
    const { data } = await axios.get(`${path}/api/product/getLenzProduct`);
    const prList = [];
    data?.data.forEach((element) => {
      const prLi = {
        label: element?.name,
        value: element?.lenzImage,
      };
      prList.push(prLi);
    });

    setProduct(prList);
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const pic = await toBase64(e.target.files[0]);
      setFile(pic);
    }
  };

  const handleChange = async (value) => {
    setChosenPr(value);
  };

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (value) => {
    handleShowModal();
    const fileFormat = file.split(",")[0];
    let image = null;
    if (
      fileFormat === "data:image/png;base64" ||
      fileFormat === "data:image/jpeg;base64" ||
      fileFormat === "data:image/jpg;base64"
    ) {
      image = true;
      setIsImage(true);
    } else {
      image = false;
      setIsImage(false);
    }

    const requestBody = {
      uploadedFileBase64: file,
      lenzFileBase64: chosenPr?.value,
    };

    const res = await axios.post(`${path}/api/eye/upload`, requestBody);
    var a = document.createElement("a"); //Create <a>
    a.href = res.data; //Image Base64 Goes here
    const dataType = res.data.split(";")[0].split("/")[1];
    a.download = `overlayedData.${dataType}`; //File name Here
    a.click();
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllLenzProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <Modal
        title="ایجاد فایل مورد نظر"
        open={isModalOpen}
        okText="تایید"
        cancelText="لغو"
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1.2rem",
            alignItems: "center",
            padding: "2rem 0",
          }}
        >
          <h5>لطفا برای شروع دانلود منتظر بمانید ...</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />
          </div>
        </div>
      </Modal>
      <div
        style={{
          minHeight: "70vh",
          padding: "1.5rem 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div className={style.descprofileLi}>
          <h6>انتخاب لنز</h6>

          <Select
            style={{ minWidth: "300px" }}
            labelInValue
            onChange={handleChange}
            options={product}
            placeholder="..."
          />
        </div>
        <div className={style.descprofileLi}>
          <h6>عکس خود را انتخاب کنید</h6>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        {file && isImage ? (
          <img
            src={file}
            alt="file"
            style={{ width: "200px", height: "200px" }}
          />
        ) : file && !isImage ? (
          <img
            src={videoIc}
            alt="file"
            style={{ width: "200px", height: "200px" }}
          />
        ) : null}
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            type="primary"
            className={style.descProfileBtn}
            onClick={handleSubmit}
          >
            {strings.submit}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LenzTest;
