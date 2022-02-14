import React from "react";
import { useLogout, useCheckAuth } from "../../hooks/auth";
import { Button, Typography, Space } from "antd";
import { useNear } from "../../hooks/near";
import { LogoutOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AppHeader = () => {
  const { wallet } = useNear();
  const isAuth = useCheckAuth();
  const logout = useLogout();

  if (isAuth) {
    return (
      <Space align="center" size="large">
        <Text style={{ color: "white" }}>{wallet.getAccountId()}</Text>
        <Button onClick={logout} icon={<LogoutOutlined />} shape="circle" />;
      </Space>
    );
  }

  return (
    <div>
      <Text type="success">Welcome to Near App</Text>
    </div>
  );
};

export default AppHeader;
