import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UnorderedListOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  UserOutlined,
  SettingOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

type navigationItem = {
  icon: any;
  name: string;
  link: string;
  children?: { name: string; link: string }[];
};

const nav: navigationItem[] = [
  { icon: PieChartOutlined, name: "Статистика", link: "#" },
  {
    icon: UnorderedListOutlined,
    name: "Расписание",
    link: "#",
    children: [
      { name: "ФВО", link: "/fvo" },
      { name: "СПО", link: "/spo" },
      { name: "По учителю", link: "/forteachers" },
    ],
  },
  {
    icon: ApartmentOutlined,
    name: "Структура",
    link: "#",
    children: [
      { name: "Преподаватели", link: "#" },
      { name: "Предметы", link: "#" },
      { name: "Кабинеты", link: "#" },
    ],
  },
  { icon: UserOutlined, name: "Администраторы", link: "#" },
  { icon: SettingOutlined, name: "Настройки", link: "#" },
  {
    icon: ExperimentOutlined,
    name: "Experimental",
    link: "/experimental",
    children: [{ name: "None", link: "/experimental/null" }],
  },
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
