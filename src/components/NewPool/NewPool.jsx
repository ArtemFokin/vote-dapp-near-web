import React from "react";
import { Form, Button, Input, Row, Col, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const MIN_OPTIONS_COUNT = 2;

const NewPool = ({ onSubmit }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    onSubmit?.({
      ...values,
      options: values.options.filter((o) => !!o),
    });
  };
  return (
    <Row justify="center">
      <Space direction="vertical">
        <Space align="center">
          <Button
            shape="circle"
            type="text"
            icon={<LeftOutlined />}
            onClick={() => navigate("/")}
          />
          <Typography.Title style={{ margin: 0 }}>New Pool</Typography.Title>
        </Space>
        <Form
          layout="vertical"
          size="large"
          style={{ width: 600 }}
          onFinish={onFinish}
          initialValues={{
            options: ["", ""],
          }}
        >
          <Form.Item
            name="name"
            label="Pool name"
            rules={[{ required: true, message: "Please input Pool name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please input question!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, names) => {
                  const filledNames = names?.filter((name) => !!name) || [];
                  if (filledNames.length < MIN_OPTIONS_COUNT) {
                    return Promise.reject(
                      new Error(
                        `At least ${MIN_OPTIONS_COUNT} options should be filled`
                      )
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              return (
                <Form.Item>
                  {fields.map((field, index) => (
                    <Form.Item label={index === 0 ? "Options" : ""}>
                      <Row gutter={10} align="middle">
                        <Col flex="auto">
                          <Form.Item noStyle {...field}>
                            <Input
                              style={{
                                width: "100%",
                                flexShrink: 1,
                                flexGrow: 1,
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col flex="none">
                          <Button
                            shape="circle"
                            icon={<MinusOutlined />}
                            onClick={() => remove(field.name)}
                            disabled={fields.length <= MIN_OPTIONS_COUNT}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item noStyle>
                    <Button
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Row>
  );
};

export default NewPool;
