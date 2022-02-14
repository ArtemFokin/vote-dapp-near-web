import React from "react";
import {
  Row,
  Space,
  Typography,
  Button,
  Divider,
  List,
  Form,
  Radio,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Pool = ({ pool, onVote }) => {
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
          <Form onFinish={onVote}>
            <Form.Item
              name="answer"
              rules={[{ required: true, message: "Please choose answer!" }]}
            >
              <Radio.Group style={{ display: "block" }}>
                <List
                  bordered
                  dataSource={pool.options}
                  renderItem={(item) => (
                    <List.Item>
                      <Radio value={item}>{item}</Radio>
                    </List.Item>
                  )}
                />
              </Radio.Group>
            </Form.Item>
            <Form.Item noStyle>
              <Button htmlType="submit" type="primary">
                Vote
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Space>
    </Row>
  );
};

export default Pool;
