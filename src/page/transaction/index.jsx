import { useLocation } from "react-router-dom";
import SuccesCard from "../../components/Transaction/SuccessCard";
import FailCard from "../../components/Transaction/FailCard/page";
import ariaLogo from "../../assets/images/logo.jpg";
import { strings } from "../../shared/language";
import style from "../../page/styles/signup.module.css";
import { path } from "../../shared/config";
import axios from "axios";
import { useEffect, useState } from "react";

const Transaction = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const authority = queryParams.get("Authority");
  const status = queryParams.get("Status");

  const [cashHash, setCashHash] = useState();

  const verifierTransaction = async () => {
    const requestbody = {
      authority,
    };
    const { data } = await axios.post(
      `${path}/api/transaction/verify`,
      requestbody
    );
    const cashH = data?.data?.data?.card_hash;
    if (!cashH) {
      setCashHash(null);
      return;
    }
    setCashHash(cashH);
  };
  verifierTransaction();
  useEffect(() => {
    verifierTransaction();
  }, [authority]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
        width: "100%",
        height: "95vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <img src={ariaLogo} alt="ariaLogo" className={style.logo} />
        <h3 className={style.header}>{strings.login.header}</h3>
      </div>
      {status === "OK" ? (
        <SuccesCard authority={cashHash} />
      ) : (
        <FailCard authority={authority} />
      )}
    </div>
  );
};

export default Transaction;
