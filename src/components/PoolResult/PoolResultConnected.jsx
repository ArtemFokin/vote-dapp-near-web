import React from "react";
import PoolResult from "./PoolResult";
import usePromise from "react-use-promise";
import { useParams } from "react-router-dom";
import { Row, Spin, Typography } from "antd";
import { useNear } from "../../hooks/near";

const PoolResultConnected = ({ options }) => {
  const { id } = useParams();
  const { contract, wallet } = useNear();
  const [votes = [], error, votesState] = usePromise(
    () =>
      contract.getPoolVotes({
        poolId: parseInt(id),
        accountId: wallet.getAccountId(),
      }),
    [id, contract, wallet]
  );

  if (votesState === "pending") {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  if (error) {
    return (
      <Row justify="center">
        <Typography.Title>Fetch data error, try again later</Typography.Title>;
      </Row>
    );
  }
  return <PoolResult votes={votes} options={options} />;
};

export default PoolResultConnected;
