import React from "react";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PoolsTable from "../PoolsTable/PoolsTable";
import { useNavigate } from "react-router";

const POOLS = [
  {
    id: "1",
    name: "Superman vs Batman",
    owner: "arty.testnet",
  },
  {
    id: "1",
    name: "Is the earth round?",
    owner: "arty.testnet",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Space direction="vertical">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/new-pool")}
        >
          Create Pool
        </Button>
        <PoolsTable pools={POOLS} />
      </Space>
    </Row>
  );
};

export default HomePage;
