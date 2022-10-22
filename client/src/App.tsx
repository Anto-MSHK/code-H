import { Button, Layout } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Main } from "./Components/Main";
import { Provider } from "react-redux";
import store from "./state/state";
import { BrowserRouter } from "react-router-dom";
import { Head } from "./Components/Header/Head";
import { Nav } from "./Components/Nav/Nav";
import { Content, Footer } from "antd/lib/layout/layout";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout className="app">
          <Head />
          <Content
            style={{
              padding: "0 50px",
            }}
          >
            <Layout
              className="site-layout-background"
              style={{
                padding: "24px 0",
              }}
            >
              <Nav />
              <Main />
            </Layout>
          </Content>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
