import React, { useMemo } from "react";
import { Typography, Button, Table } from "antd";

const { Title, Text } = Typography;

const PoolsTable = ({ pools, onPoolClick }) => {
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
      key: "name",
      render: (text, record) => (
        <Button type="primary" onClick={() => onPoolClick(record.key)}>
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
      style={{ width: 600, maxWidth: "90%" }}
      columns={columns}
      dataSource={tableRows}
      pagination={false}
    />
  );
};

export default PoolsTable;
