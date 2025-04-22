import axios from "axios";
import { path } from "../../../shared/config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Divider, Input, Typography } from "antd";
import { commaThousondSeperator } from "../../../shared/utils";
import style from "../../styles/response/style.module.css";
import { strings } from "../../../shared/language";

const Response = () => {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [comment, setComment] = useState();
  const [responseCm, setResponseCm] = useState();

  const getCommentData = async () => {
    const { data } = await axios.get(
      `${path}/api/comment/getById/?id=${commentId}`
    );
    setComment(data?.data);
    getProductById(data?.data?.productId);
  };

  const getProductById = async (productId) => {
    const { data } = await axios.get(
      `${path}/api/product/getById/?id=${productId}`
    );
    setProduct(data?.data);
  };

  const handleCommentResponse = (event) => {
    setResponseCm(event.target.value);
  };

  const handleSubmit = async () => {
    const requestbody = {
      commentId: commentId,
      response: responseCm,
    };

    const { data } = await axios.post(
      `${path}/api/comment/answersCommentById`,
      requestbody
    );
    if (data?.isSuccess) {
      navigate("/panel/comments");
    }
  };

  useEffect(() => {
    getCommentData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Card
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "170px",
            }}
          >
            <img
              src={product?.image}
              alt="cover"
              style={{ width: "100%", maxWidth: "260px" }}
            />
            <div className={style.showCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <h6 style={{ margin: 0, fontWeight: "600" }}>نام محصول :</h6>
                <strong style={{ fontSize: "16px" }}>{product?.name}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <h6 style={{ margin: 0, fontWeight: "600" }}>برند سازنده :</h6>
                <strong style={{ fontSize: "16px" }}>
                  {product?.brand?.title}
                </strong>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <h6 style={{ margin: 0, fontWeight: "600" }}>قیمت :</h6>
                <strong style={{ fontSize: "16px" }}>
                  {product?.price && commaThousondSeperator(product?.price)}{" "}
                  تومان
                </strong>
              </div>
              {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "600" }}>امتیاز :</h6>
                  <div>
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#F0DB23", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#e3e3e3", fontSize: "1.2rem" }}
                    />
                    <StarFilled
                      style={{ color: "#e3e3e3", fontSize: "1.2rem" }}
                    />
                  </div>
                </div> */}
            </div>
          </div>
        </Card>
        <div
          style={{
            display: "flex",
            gap: "2.2rem",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#6fb5be69",
              minWidth: "160px",
              minHeight: "60px",
              display: "grid",
              placeItems: "center",
              fontSize: "1.4rem",
              fontWeight: 600,
            }}
          >
            {product?.brand?.title}
          </div>
        </div>
      </div>
      <div>
        <Divider style={{ margin: "2rem" }} />
        <div style={{ padding: "0 1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <h5>کاربر</h5>
              <h5 style={{ margin: "0px !important" }}>{comment?.username}</h5>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <p>{comment?.title}</p>
          </div>
          <div>
            <div className={style.descprofileLi}>
              <Typography.Title level={5}>پاسخ : </Typography.Title>

              <div style={{ width: "100%" }} name="Specifications">
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="..."
                  style={{
                    height: 120,
                    resize: "none",
                  }}
                  name="Specifications"
                  onChange={(e) => handleCommentResponse(e)}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "end",
                alignItems: "center",
                display: "flex",
                marginTop: "2rem",
              }}
            >
              <Button
                type="primary"
                block
                className={style.descProfileBtn}
                onClick={handleSubmit}
                disabled={!responseCm}
                htmlType="submit"
              >
                {strings.submit}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
