import React from "react";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PoolsTableConnected from "../PoolsTable/PoolsTableConnected";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Space direction="vertical">
        <Row justify="center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/new-pool")}
          >
            Create Pool
          </Button>
        </Row>
        <Row justify="center">
          <PoolsTableConnected />
        </Row>
      </Space>
    </Row>
  );
};

export default HomePage;
