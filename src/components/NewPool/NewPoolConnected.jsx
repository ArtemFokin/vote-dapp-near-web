import React from "react";
import NewPool from "./NewPool";

const NewPoolConnected = () => {
  const onSubmit = (values) => {
    console.log({ values });
  };
  return <NewPool onSubmit={onSubmit} />;
};

export default NewPoolConnected;
