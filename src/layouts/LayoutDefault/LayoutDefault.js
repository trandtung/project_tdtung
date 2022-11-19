import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";

import classNames from "classnames/bind";
import styles from "./LayoutDefault.module.scss";
import { Children } from "react";
const cx = classNames.bind(styles);
const { Header, Content, Sider } = Layout;

function LayoutDefault({ children }) {
  // const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%" }} className={cx("layout")}>
      <Sidebar>
        <Menu>
          <MenuItem routerLink={<Link to="/profile" />}> Trang chủ</MenuItem>
          <MenuItem routerLink={<Link to="/calendar" />}> Chuẩn đoán</MenuItem>
          <MenuItem routerLink={<Link to="/e-commerce" />}>
            {" "}
            Danh sách bệnh nhân
          </MenuItem>
          <MenuItem routerLink={<Link to="/profile" />}> Tài khoản</MenuItem>
          <MenuItem routerLink={<Link to="/profile" />}> Đẵng xuất</MenuItem>
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
