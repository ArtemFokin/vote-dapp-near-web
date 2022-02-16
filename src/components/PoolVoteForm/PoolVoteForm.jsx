import React from "react";
import { Button, List, Form, Radio } from "antd";

const PoolVoteForm = ({ onFinish, options }) => {
  return (
    <Form onFinish={(values) => onFinish(values.answer)}>
      <Form.Item
        name="answer"
        rules={[{ required: true, message: "Please choose answer!" }]}
      >
        <Radio.Group style={{ display: "block" }}>
          <List
            bordered
            dataSource={options}
            renderItem={(item) => (
              <List.Item>
                <Radio value={item.id}>{item.value}</Radio>
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
  );
};

export default PoolVoteForm;
