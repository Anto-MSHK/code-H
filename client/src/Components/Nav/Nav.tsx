import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

type navigationItem = {
  icon: any;
  name: string;
  link: string;
  children?: { name: string; link: string }[];
};

const nav: navigationItem[] = [
  {
    icon: UnorderedListOutlined,
    name: "Главная страница",
    link: "/",
  },
  { icon: SettingOutlined, name: "Настройки", link: "/settings" },
];

const item2 = nav.map((el, index) => {
  const key = String(index + 1);
  let children = undefined;
  if (el.children) {
    children = el.children.map((child, iChild) => {
      let subKey = el.name + iChild;
      return (
        <Menu.Item key={subKey}>
          <span>{child.name}</span>
          <NavLink to={child.link} />
        </Menu.Item>
      );
    });
    return (
      <Menu.SubMenu title={el.name} icon={<el.icon />}>
        {children}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item key={`sub${key}`}>
      <el.icon />
      <span>{el.name}</span>
      <NavLink to={el.link} />
    </Menu.Item>
  );
});

export const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className="site-layout-background"
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {item2}
      </Menu>
    </Sider>
  );
};
