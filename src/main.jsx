import React from "react";
import ReactDOM from "react-dom/client";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "./assets/fonts/Rezvan.ttf"



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider direction="rtl">
      <App />
      <ToastContainer />
    </ConfigProvider>
  </React.StrictMode>
);
