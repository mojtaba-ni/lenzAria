import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { WarningOutlined } from '@ant-design/icons';

function CustomModal({ visible, onCancel, onOk, text, title }) {
  const [loading, setLoading] = useState(false)
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" size="large" style={{ width: "100px", height: "37px", border: "1px solid red", color: "red" }} onClick={onCancel}>خیر</Button>,
        <Button key="submit" size="large" style={{ width: "100px", height: "37px", border: "1px solid blue", color: "blue" }} loading={loading} onClick={onOk}>
          بله
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          height: "70px",
          fontSize: "16px"
        }}>
        {/* <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>

          <WarningOutlined style={{ fontSize: "50px", color: "#fcae1e" }} />
        </div> */}
        <p>{text}</p>
      </div>
    </Modal>
  )
}

export default CustomModal