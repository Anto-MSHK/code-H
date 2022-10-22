import React from "react";
import { Header } from "antd/lib/layout/layout";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Header.css";

export const Head = () => {
  return (
    <Header className="header">
      <div className="info">
        <span></span>
      </div>
      <span className="logo">MyATI</span>
      <div className="User">
        <span>
          <div className="user_info">
            Имя Фамилия⠀
            <Avatar className="avatar" icon={<UserOutlined />} />
          </div>
          <div className="user_rank">Кто по жизни</div>
        </span>
      </div>
    </Header>
  );
};
