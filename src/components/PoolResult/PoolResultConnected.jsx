import React from "react";
import PoolResult from "./PoolResult";
import usePromise from "react-use-promise";
import { getPoolVotes } from "../../api";
import { useParams } from "react-router-dom";
import { Row, Spin } from "antd";

const PoolResultConnected = ({ options }) => {
  const { id } = useParams();
  const [votes = [], , votesState] = usePromise(() => getPoolVotes(id), [id]);

  if (votesState === "pending") {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }
  return <PoolResult votes={votes} options={options} />;
};

export default PoolResultConnected;
