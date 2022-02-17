import React, { useState, useEffect } from "react";
import PoolsTable from "./PoolsTable";
import { useNavigate } from "react-router";
import { getPools, deletePool } from "../../api";
import { Typography, Spin } from "antd";
import { useNear } from "../../hooks/near";

const PoolsTableConnected = () => {
  const { contract } = useNear();
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
      setLoading(true);
      const pls = await getPools();
      // const asyncPools = await .getPoolsList(0, 10);
      console.log({ contract });
      if (cancelled) return;
      const notCancelledPools = pls.filter((p) => !p.deleted);
      setPools(notCancelledPools);
      setLoading(false);
    })();
    return () => (cancelled = true);
  }, [refetch, contract]);

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
