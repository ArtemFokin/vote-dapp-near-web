import React from "react";
import { Row, Space, Typography, Button, Divider, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PoolResultConnected from "../PoolResult/PoolResultConnected";
import PoolVoteForm from "../PoolVoteForm/PoolVoteForm";

const PoolCard = ({ pool, options, onVote, userVoted, contentLoading }) => {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Space direction="vertical">
        <Button
          shape="round"
          type="ghost"
          icon={<LeftOutlined />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
        <div
          style={{
            width: 600,
            background: "white",
            padding: "20px 30px",
            borderRadius: 10,
          }}
        >
          <Typography.Title>{pool.name}</Typography.Title>
          <Divider />
          <Typography.Title level={3}>{pool.question}</Typography.Title>

          {contentLoading ? (
            <Row justify="center">
              <Spin />
            </Row>
          ) : (
            <>
              {userVoted ? (
                <PoolResultConnected options={options} />
              ) : (
                <PoolVoteForm onFinish={onVote} options={options} />
              )}
            </>
          )}
        </div>
      </Space>
    </Row>
  );
};

export default PoolCard;
