import React from "react";
import { useLogout, useCheckAuth } from "../../hooks/auth";
import { Button, Typography, Space, Row } from "antd";
import { useNear } from "../../hooks/near";
import { LogoutOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/curves-logo.svg";
const { Text } = Typography;

const AppHeader = () => {
  const { wallet } = useNear();
  const isAuth = useCheckAuth();
  const logout = useLogout();

  return (
    <Row justify="space-between" align="middle" style={{ height: "100%" }}>
      <a
        href="https://www.curves.digital/"
        target="_blank"
        style={{ display: "flex" }}
        rel="noreferrer"
      >
        <Logo style={{ width: 130, fill: "white" }} />
      </a>
      {isAuth && (
        <Space align="center" size="large">
          <Text style={{ color: "white" }}>{wallet.getAccountId()}</Text>
          <Button onClick={logout} icon={<LogoutOutlined />} shape="circle" />;
        </Space>
      )}
    </Row>
  );
};

export default AppHeader;
