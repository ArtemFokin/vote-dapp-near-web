import React from "react";
import { useLogout, useCheckAuth } from "../../hooks/auth";
import { Button, Typography } from "antd";

const { Text } = Typography;

const AppHeader = () => {
  const isAuth = useCheckAuth();
  const logout = useLogout();

  if (isAuth) {
    return <Button onClick={logout}>Logout</Button>;
  }

  return (
    <div>
      <Text type="success">Welcome to Near App</Text>
    </div>
  );
};

export default AppHeader;
