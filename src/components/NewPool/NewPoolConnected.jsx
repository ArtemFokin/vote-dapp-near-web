import React, { useState } from "react";
import NewPool from "./NewPool";
import { useNear } from "../../hooks/near";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const NewPoolConnected = () => {
  const { contract } = useNear();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await contract.createPoolWithOptions({
        name: values.name,
        question: values.question,
        optionsValues: values.options || [],
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Blockchain error",
        description: "Please try again later",
      });
    }
  };
  return <NewPool onSubmit={onSubmit} loading={loading} />;
};

export default NewPoolConnected;
