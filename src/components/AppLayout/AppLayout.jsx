import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../AppHeader/AppHeader";

const { Header, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <AppHeader />
      </Header>
      <Content style={{ height: "100%", padding: 50 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
