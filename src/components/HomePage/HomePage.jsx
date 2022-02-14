import React from "react";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PoolsTable from "../PoolsTable/PoolsTable";
import { useNavigate } from "react-router";

const POOLS = [
  {
    id: "1",
    name: "Superman vs Batman",
    owner: "artyom_fokin.testnet",
  },
  {
    id: "2",
    name: "Is the earth round?",
    owner: "artyom_fn.testnet",
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
        <PoolsTable
          pools={POOLS}
          onPoolJoin={() => {}}
          onPoolDelete={() => {}}
        />
      </Space>
    </Row>
  );
};

export default HomePage;
