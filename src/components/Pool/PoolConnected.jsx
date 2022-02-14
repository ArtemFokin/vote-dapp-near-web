import React, { useState, useEffect } from "react";
import Pool from "./Pool";
import { useParams } from "react-router";
import { getPool } from "../api";
import { Spin, Typography, Row } from "antd";

const PoolConnected = () => {
  const { id } = useParams();

  const [pool, setPool] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pl = await getPool(id);
      if (!cancelled) {
        setPool(pl);
        setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [id]);

  const onVote = (option) => {};

  if (loading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  if (!pool) {
    return <Typography.Title>Pool '{id}' not found</Typography.Title>;
  }

  return <Pool pool={pool} onVote={onVote} />;
};

export default PoolConnected;
