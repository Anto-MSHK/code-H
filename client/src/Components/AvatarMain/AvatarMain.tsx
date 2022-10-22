import React, { FC } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface AvatarMainI {
  user: string;
}
export const AvatarMain: FC<AvatarMainI> = ({ user }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        size={"small"}
        icon={<UserOutlined />}
        style={{ margin: "0 5px 0 0", backgroundColor: "#40a9ff" }}
      />
      <h3>{user}</h3>
    </div>
  );
};
