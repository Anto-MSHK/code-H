import { Content } from "antd/lib/layout/layout";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Board } from "./Board/Board";
import "./Main.css"
import {Settings} from "./Settings/Settings";

export const Main = () => {
  return (
    <Content style={{ padding: "0 24px", minHeight: 280 }} className={"main"}>
      <Routes>
        <Route path="/auth" element={<div></div>} />
        <Route path="/main/" element={<Board title={"Все задачи"} />} />
        <Route path="/settings/" element={<Settings />} />
      </Routes>
    </Content>
  );
};
