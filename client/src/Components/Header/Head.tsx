import React from "react";
import { Header } from "antd/lib/layout/layout";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Header.css";

export const Head = () => {
  return (
    <Header className="header">
      <span className="logo"></span>
      <div className="User"></div>
    </Header>
  );
};
