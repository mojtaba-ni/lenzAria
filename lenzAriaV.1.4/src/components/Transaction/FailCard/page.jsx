import { Button, Card, Divider } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../SuccessCard/succesCard.module.css";

// eslint-disable-next-line react/prop-types
const FailCard = ({ authority }) => {
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
        <CloseCircleOutlined style={{ fontSize: "4rem", color: "red" }} />
        <h6>عملیات با خطا مواجه شد</h6>
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
          <p>{authority}</p>
        </div>
        <Button onClick={handleBsite}>بازگشت به سایت</Button>
      </div>
    </Card>
  );
};

export default FailCard;
