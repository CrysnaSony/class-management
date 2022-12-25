import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import "../styles/login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  //   const history = useNavigate();
  const url = "http://localhost:3001";
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios.post(url + "/login", values).then((response) => {
      props.setToken(response.data.token);
      sessionStorage.setItem("token", response.data.token);
      //   history("/add-student");
    });
  };
  return (
    <Row gutter={16} className="login-wrap">
      <Col span={6}>
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            &nbsp; Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Login;
