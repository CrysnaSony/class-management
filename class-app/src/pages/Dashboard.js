import React from "react";

import SideNav from "./Sidebar";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import AddStudent from "./AddStudent";
import Register from "./Register";
import ManageResult from "./ManageResult";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: "/",
    label: "Add Student",
    icon: <UserOutlined />,
  },
  {
    key: "/manage-result",
    label: "Manage Result",
    icon: <UserOutlined />,
  },
];

const Dashboard = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    history(value);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={(item) => setRouteActive(item.key)}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h1>Class Management</h1>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/" element={<AddStudent />} />
              <Route exact path="/manage-result" element={<ManageResult />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>

    //   <div className="container">
    //     <Router initialEntries={["/add-patient"]}>
    //     <SideNav role={props.role}  />
    //     <div className={"main"}>

    //         <Routes>
    //           <Route exact path="/add-patient">

    //           </Route>
    //           <Route exact path="/search-patient">

    //           </Route>

    //             <Route exact path="/register-user">

    //             </Route>

    //             <Route exact path="/report">

    //             </Route>

    //           <Route exact path="/queue">

    //           </Route>
    //           <Route exact path="/logout">

    //           </Route>
    //         </Routes>
    //       </div>

    //   </Router>
    //   </div>
  );
};

export default Dashboard;
