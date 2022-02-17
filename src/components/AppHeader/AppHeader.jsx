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

  if (isAuth) {
    return (
      <Row justify="space-between" align="middle">
        <Logo style={{ width: 130, fill: "white" }} />
        {isAuth && (
          <Space align="center" size="large">
            <Text style={{ color: "white" }}>{wallet.getAccountId()}</Text>
            <Button onClick={logout} icon={<LogoutOutlined />} shape="circle" />
            ;
          </Space>
        )}
      </Row>
    );
  }
};

export default AppHeader;
