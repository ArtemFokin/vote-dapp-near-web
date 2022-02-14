import React, { useMemo } from "react";
import { Typography, Button, Table } from "antd";
import { useNear } from "../../hooks/near";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PoolsTable = ({ pools, onPoolJoin, onPoolDelete }) => {
  const { wallet } = useNear();
  const userAcc = useMemo(() => wallet.getAccountId(), [wallet]);
  const columns = [
    {
      title: "Pool name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Title level={4}>{text}</Title>,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "",
      key: "delete",
      render: (text, record) =>
        userAcc === record.owner && (
          <Button
            type="text"
            shape="circle"
            onClick={() => onPoolDelete(record.key)}
            icon={<DeleteOutlined />}
          />
        ),
    },
    {
      title: "",
      key: "name",
      render: (text, record) => (
        <Button type="primary" onClick={() => onPoolJoin(record.key)}>
          Join
        </Button>
      ),
    },
  ];

  const tableRows = useMemo(
    () =>
      pools.map((pool) => ({
        key: pool.id,
        name: pool.name,
        owner: pool.owner,
      })),
    [pools]
  );

  return (
    <Table
      style={{ maxWidth: "90%", width: 700 }}
      columns={columns}
      dataSource={tableRows}
      pagination={false}
      bordered={false}
    />
  );
};

export default PoolsTable;
