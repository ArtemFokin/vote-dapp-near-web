import React from "react";
import { Button, Row, Typography, Space } from "antd";
import { useLogin, useCheckAuth } from "../../hooks/auth";
import { useLocation, Navigate } from "react-router-dom";

const Login = () => {
  const login = useLogin();
  const location = useLocation();
  const isAuth = useCheckAuth();
  const from = location.state?.from?.pathname || "/";

  if (isAuth) {
    return <Navigate to={from} />;
  }

  return (
    <Row justify="center">
      <Space direction="vertical">
        <Typography.Title>Login with near testnet wallet</Typography.Title>
        <Button
          type="primary"
          onClick={() => login(window.location.origin + from)}
        >
          Login with near
        </Button>
      </Space>
    </Row>
  );
};

export default Login;
