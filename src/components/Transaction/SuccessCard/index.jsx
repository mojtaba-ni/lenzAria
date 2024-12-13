import { Button, Card, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./succesCard.module.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SuccesCard = ({ authority }) => {
  const navigate = useNavigate();
  const handleBsite = () => {
    navigate(`/`);
  };

  return (
    <Card className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.7rem",
          marginBottom: "1rem",
        }}
      >
        <CheckCircleOutlined style={{ fontSize: "4rem", color: "green" }} />
        <h6>عملیات با موفقیت انجام شد</h6>
      </div>

      <Divider className={styles.divider} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <p>شماره تراکنش :</p>
          {/* <p>{authority}</p> */}
          <h6
            style={{
              maxWidth: "270px",
              overflowX: "auto",
              overflowY: "hidden",
              padding: "1rem",
              whiteSpace: "nowrap",
            }}
          >
            {authority}
          </h6>
        </div>
        <p style={{ color: "green" }}>سفارش شما ثبت شد</p>
        <Button style={{ margin: "1rem 0" }} onClick={handleBsite}>
          بازگشت به سایت
        </Button>
      </div>
    </Card>
  );
};

export default SuccesCard;
