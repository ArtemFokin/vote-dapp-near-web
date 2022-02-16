import React from "react";
import NewPool from "./NewPool";
import { createPool } from "../../api";
import { useNear } from "../../hooks/near";
import { useNavigate } from "react-router-dom";

const NewPoolConnected = () => {
  const { wallet } = useNear();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const r = await createPool({
      name: values.name,
      question: values.question,
      owner: wallet.getAccountId(),
      options: values.options,
    });
    if (r) {
      navigate("/");
    }
  };
  return <NewPool onSubmit={onSubmit} />;
};

export default NewPoolConnected;
