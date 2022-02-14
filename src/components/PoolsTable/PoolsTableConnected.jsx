import React, { useState, useEffect } from "react";
import PoolsTable from "./PoolsTable";
import { useNavigate } from "react-router";
import { getPools, deletePool } from "../api";
import { Typography, Spin } from "antd";

const PoolsTableConnected = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const navigate = useNavigate();
  const onPoolDelete = (pool) => {
    deletePool(pool);
    setRefetch((r) => !r);
  };
  const onPoolJoin = (pool) => {
    navigate(`/pool/${pool}`);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pls = await getPools();
      if (!cancelled) {
        setPools(pls);
        setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [refetch]);

  if (loading) {
    return <Spin />;
  }

  if (!pools.length) {
    return <Typography.Text>Pools not found, create one</Typography.Text>;
  }

  return (
    <PoolsTable
      pools={pools}
      onPoolDelete={onPoolDelete}
      onPoolJoin={onPoolJoin}
    />
  );
};

export default PoolsTableConnected;
