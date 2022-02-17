import React, { useState } from "react";
import PoolVoteForm from "./PoolVoteForm";
import { useNear } from "../../hooks/near";
import { notification } from "antd";

const PoolVoteFormConnected = ({ onFinish, options }) => {
  const [sending, setSending] = useState(false);
  const { contract } = useNear();

  const onFinishHandler = async (option) => {
    try {
      setSending(true);
      await contract.createVote({ optionId: option });
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Blockchain error",
        description: "Please try again later",
      });
    }
    onFinish();
    setSending(false);
  };

  return (
    <PoolVoteForm
      onFinish={onFinishHandler}
      options={options}
      sending={sending}
    />
  );
};

export default PoolVoteFormConnected;
