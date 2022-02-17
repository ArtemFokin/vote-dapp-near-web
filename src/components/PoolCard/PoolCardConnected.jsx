import React, { useState } from "react";
import PoolCard from "./PoolCard";
import { useParams } from "react-router";
import {
  getPool,
  checkAccountVote,
  getPoolOptions,
  crateVote,
} from "../../api";
import { Typography, Spin } from "antd";
import usePromise from "react-use-promise";
import { useNear } from "../../hooks/near";

const PoolCardConnected = () => {
  const { id } = useParams();
  const { wallet } = useNear();
  const [refetchUserVoted, setRefetchUserVoted] = useState(false);

  const [pool, , poolState] = usePromise(() => getPool(id), [id]);
  const [userVoted, , userVotedState] = usePromise(
    () => checkAccountVote(wallet.getAccountId(), id),
    [id, wallet, refetchUserVoted]
  );
  const [options, , optionsState] = usePromise(() => getPoolOptions(id), [id]);

  if (poolState === "pending") {
    return <Spin />;
  }

  const onVote = async (option) => {
    const r = await crateVote(option, wallet.getAccountId());
    if (r) {
      setRefetchUserVoted((r) => !r);
    }
  };

  if (!pool) {
    return <Typography.Title>Pool '{id}' not found</Typography.Title>;
  }

  return (
    <PoolCard
      pool={pool}
      userVoted={userVoted}
      options={options}
      onVote={onVote}
      contentLoading={
        optionsState === "pending" || userVotedState === "pending"
      }
    />
  );
};

export default PoolCardConnected;
