import React from "react";
import { Formik } from "formik";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../state/auth/reducer";
import { useAppDispatch } from "../../state/redux";
import { useDispatch } from "react-redux";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(login(values.email, values.password) as any);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
