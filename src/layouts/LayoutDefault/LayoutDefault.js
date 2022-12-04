import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";
import LogoutModal from "../MenuItem/Logout/Logout";
import { useState } from "react";
import { logOut } from "../../utils/apiRequest";

import classNames from "classnames/bind";
import styles from "./LayoutDefault.module.scss";
const cx = classNames.bind(styles);
const { Header, Content, Sider } = Layout;

function LayoutDefault({ children }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItem = [
    {
      link: "/home",
      title: "Trang chủ",
    },
    {
      link: "/predict",
      title: "Chuẩn đoán",
    },
    {
      link: "/clients",
      title: "Danh sách bệnh nhân",
    },
    {
      link: "/account",
      title: "Tài khoản",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    logOut();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          <MenuItem onClick={showModal}>Đăng xuất</MenuItem>
        </Menu>
      </Sidebar>
      <LogoutModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
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
    </div>
  );
}
export default LayoutDefault;
