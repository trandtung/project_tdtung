import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./LayoutDefault.module.scss";
const cx = classNames.bind(styles);
const { Header, Content, Sider } = Layout;

function LayoutDefault({ children }) {
  const location = useLocation();
  const menuItem = [
    {
      link: "/profile",
      title: "Trang chủ",
    },
    {
      link: "/predict",
      title: "Chuẩn đoán",
    },
    {
      link: "/client",
      title: "Danh sách bệnh nhân",
    },
    {
      link: "/account",
      title: "Tài khoản",
    },
    
  ];

  return (
    <div style={{ display: "flex", height: "100%" }} className={cx("layout")}>
      <Sidebar>
        <Menu>
          {menuItem?.map((menu, index) => (
            <MenuItem
              key={index}
              routerLink={<Link to={menu.link} />}
              active={location.pathname === menu.link}
            >
              {menu.title}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>CHuân</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
      {/* <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main> */}
    </div>
  );
}
export default LayoutDefault;
