import { Button, Form, Input, Row, Col, Divider } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm] = Form.useForm();
  const history = useNavigate();
  const url = "http://localhost:3001";
  const onFinish = async (values) => {
    const { email, password } = { ...values };
    await axios
      .post(url + "/register", { email, password })
      .then(() => history("/login"));
  };
  return (
    <Row gutter={16} className="login-wrap">
      <Col span={6}>
        <h1>Register</h1>
        <Divider />
        <Form
          layout="vertical"
          form={registerForm}
          onFinish={onFinish}
          footer={
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Register"}
            </Button>
          }
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input placeholder="Enter Password" clearable type="password" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="cPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Password" type="password" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Register;
