import React, { useState, useMemo } from "react";
import PoolCard from "./PoolCard";
import { useParams } from "react-router";
import { Typography, Spin, Row } from "antd";
import usePromise from "react-use-promise";
import { useNear } from "../../hooks/near";

const PoolCardConnected = () => {
  const { id } = useParams();
  const poolId = useMemo(() => parseInt(id), [id]);
  const { contract } = useNear();

  const [refetchUserVoted, setRefetchUserVoted] = useState(false);

  const [pool, getContractError, poolState] = usePromise(
    () => contract.getPool({ id: poolId }),
    [poolId, contract]
  );
  const [userVoted, checkAccountError, userVotedState] = usePromise(
    () => contract.checkAccountVote({ poolId }),
    [poolId, contract, refetchUserVoted]
  );

  const [options, getPoolOptionsError, optionsState] = usePromise(
    () => contract.getPoolOptions({ poolId }),
    [poolId, contract]
  );

  if (getPoolOptionsError || checkAccountError || getContractError) {
    console.log({
      getPoolOptionsError,
      checkAccountError,
      getContractError,
    });
    return (
      <Row justify="center">
        <Typography.Title level={3}>
          Error during request data from blockchain
        </Typography.Title>
      </Row>
    );
  }

  if (poolState === "pending") {
    return <Spin />;
  }

  const onVote = async (option) => {
    setRefetchUserVoted((r) => !r);
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
