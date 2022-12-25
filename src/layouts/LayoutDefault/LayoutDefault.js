import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";
import LogoutModal from "../MenuItem/Logout/Logout";
import { useState } from "react";
import { logOut } from "../../utils/apiRequest";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTableList,
  faFlaskVial,
  faFileInvoice,
  faRightFromBracket,
  faDirections,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./LayoutDefault.module.scss";
const cx = classNames.bind(styles);
const { Content, Sider } = Layout;

function LayoutDefault({ children }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItem = [
    {
      link: "/home",
      icon: faHouse,
      title: "Trang chủ",
    },
    {
      link: "/predict",
      icon: faFingerprint,
      title: "Chuẩn đoán",
    },
    {
      link: "/clients",
      icon: faTableList,
      title: "Danh sách bệnh nhân",
    },
    {
      link: "/test",
      icon: faFlaskVial,
      title: "Thử nghiệm",
    },
    {
      link: "/account",
      icon: faFileInvoice,
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
    <div
      style={{ display: "flex", height: "100%", width: "100%" }}
      className={cx("layout")}
    >
      <Sidebar style={{ width: "200px", position: "fixed" }}>
        <Menu>
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
          {menuItem?.map((menu, index) => (
            <MenuItem
              key={index}
              icon={<FontAwesomeIcon icon={menu.icon} />}
              routerLink={<Link to={menu.link} />}
              active={location.pathname === menu.link}
            >
              {menu.title}
            </MenuItem>
          ))}
          <MenuItem
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={showModal}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </Sidebar>
      <LogoutModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Layout
        style={{
          padding: "0 24px 24px",
          minHeight: "1000px",
          overflow: "auto",
          marginLeft: "250px",
        }}
      >
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item link>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>CHuân</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Header />
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
