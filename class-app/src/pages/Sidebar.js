import React from "react";
import { Layout } from "antd";

import {
    LeftOutlined, TeamOutlined, UnorderedListOutlined,
    UserAddOutlined
} from "@ant-design/icons";
import {
    useLocation, useNavigate
} from "react-router-dom";
// import "../styles/demo2.css";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,

    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
const { Header, Content, Footer, Sider,Menu } = Layout;

const Sidebar = () => {
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    history.push(value);
  };

  const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));
  const tabs = [
    {
      key: "/add-patient",
      title: "Add Patient",
      icon: <UserAddOutlined />,
    },
    {
      key: "/search-patient",
      title: "Search Patient",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "/Queue",
      title: "Queue",
      icon: <TeamOutlined />,
    },
    {
      key: "/logout",
      title: "Logout",
      icon: <LeftOutlined />,
    },
  ];

  
    return (
        <>
    <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider> 
      </>
    //  <Sider activeKey={pathname}
    //     style={{
    //         overflow: 'auto',
    //         height: '100vh',
    //         position: 'fixed',
    //         left: 0,
    //         top: 0,
    //         bottom: 0,
    //     }}
    //     onChange={(value) => setRouteActive(value)}>
    //   {items.map((item) => (
    //     <Menu  theme="dark" mode="inline"  key={item.key} title={item.title} />
    //   ))}
    //    </Sider>

    );
  
};

export default Sidebar;
