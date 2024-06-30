import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./layoutAdmin.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../../Services/AuthService";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

import {
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined,
  TrophyOutlined,
  LogoutOutlined,
  GroupOutlined
} from "@ant-design/icons"; //icon dashboards side menu
import { Layout, Menu, theme } from "antd";
import { doLogoutAction } from "../../../Redux/Reducer/userSlice";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const itemsSlider = [
  getItem(
    <Link to={"/"}>
      <p
        style={{
          fontWeight: "bold",
          fontFamily: "'Reem Kufi', sans-serif",
          display: "inline-block",
          transform: "translate(0, 7px)",
          fontSize: "20px",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        ITC Group
      </p>
    </Link>,
    "0",
    <img
      className="m-0"
      style={{
        width: "25px",
        display: "inline-block",
      }}
      src="../../image/logo/logo8.png"
      alt=""
    />
  ),
  getItem(
    <Link to="/admin" className="text-decoration-none">
      Dashboard
    </Link>,
    "1",
    <DashboardOutlined />,
    []
  ),
  getItem("User", "Sub1", <UserOutlined />, [
    getItem(
      <Link to="/admin/manageUser" className="text-decoration-none">
       List Employee
      </Link>,
      "2"
    ),
  ]),

  getItem("Project", "Sub2", <ProjectOutlined />, [
    getItem(
      <Link to="/admin/project" className="text-decoration-none">
        List of projects
      </Link>,
      "3"
    ),
  ]),

  getItem("Laudatory", "Sub3", <TrophyOutlined />, [
    getItem(
      <Link to="/admin/laudatory" className="text-decoration-none">
        List of Laudatory
      </Link>,
      "4"
    ),
  ]),

  getItem("Department", "Sub4", <GroupOutlined />, [
    getItem(
      <Link to="/admin/dpm" className="text-decoration-none">
        Danh Sach
      </Link>,
      "5"
    ),
  ]),
];

const layoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      await AuthService.logoutApi();   
      dispatch(doLogoutAction());
      navigate('/login'); 
      localStorage.removeItem('token');
  } catch (error) {
      console.error('Error logging out:', error);
  }
  };

  const items = [
    {
      label: (
        <p className="m-0">
          <LogoutOutlined /> Đăng xuất
        </p>
      ),
      key: "0",
      onClick: handleLogout,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemsSlider}
          />
        </Sider>
        <Layout>
          <Header className={cx("headerAdminLayout")}>
            <div className={cx("infoUser")}>
              <img
                className={cx("imgAvatar")}
                src={`${user?.inforUser?.avatar}`}
                alt=""
              />
              <Dropdown
                menu={{
                  items,
                }}
                placement="top"
              >
                <Button> {user?.inforUser?.username || ""}</Button>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ backgroundColor: "#F0F3F" }}>
            <div>
              <Outlet />
             
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default layoutAdmin;
