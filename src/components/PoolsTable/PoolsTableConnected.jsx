import React, { useState, useEffect } from "react";
import PoolsTable from "./PoolsTable";
import { useNavigate } from "react-router";
import { Typography, Spin, notification } from "antd";
import { useNear } from "../../hooks/near";

const PoolsTableConnected = () => {
  const { contract } = useNear();
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const navigate = useNavigate();
  const onPoolDelete = async (pool) => {
    try {
      await contract.deletePool({ poolId: pool });
      setPools((currentPools) =>
        currentPools.filter((pool) => pool.id === pool)
      );
    } catch (err) {
      notification.error({
        message: "Blockchain error",
        description: "Please try again later",
      });
      console.log(err);
    }
    setRefetch((r) => !r);
  };
  const onPoolJoin = (pool) => {
    navigate(`/pool/${pool}`);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const result = await contract.getPoolsList({ offset: 0, limit: 10 });
        if (cancelled) return;
        const notCancelledPools = result.filter((p) => !p.deleted);
        setPools(notCancelledPools);
      } catch (err) {
        console.log(err);
        notification.error({
          message: "Blockchain error",
          description: "Please try again later",
        });
      }
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
