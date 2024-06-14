import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./layoutAdmin.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

import {
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined,
  TrophyOutlined,
  LogoutOutlined,
} from "@ant-design/icons"; //icon dashboards side menu
import { Layout, Menu, theme } from "antd";

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
        {" "}
        ITC Group{" "}
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
      {" "}
      Dashboard
    </Link>,
    "1",
    <DashboardOutlined />,
    []
  ),
  getItem("User", "Sub1", <UserOutlined />, [
    getItem(
      <Link to="/admin/manageUser" className="text-decoration-none">
        {" "}
        Danh Sach Can bo
      </Link>,
      "2"
    ),
    getItem(
      <Link to="/admin/manageStaff" className="text-decoration-none">
        {" "}
        Danh Sach Nhan vien
      </Link>,
      "3"
    ),
  ]),

  getItem("Project", "Sub2", <ProjectOutlined />, [
    getItem(
      <Link to="/admin/dtnk" className="text-decoration-none">
        {" "}
        Danh Sach
      </Link>,
      "4"
    ),
  ]),

  getItem("Trophy", "Sub3", <TrophyOutlined />, [
    getItem(
      <Link to="/admin/award" className="text-decoration-none">
        {" "}
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
    const res = await AuthService.logoutApi();
    if (res.status === 200) {
      dispatch(doLogoutAction());
      // toast.success("Đăng xuất thành công");
      navigate("/login");
      // console.log("Logout thanh cong")
    }
  };

  // useEffect(() => {
  //   // fetchNotification();
  // }, []);

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
                src={`http://localhost:3037/${user?.avatar}`}
                alt=""
              />
              <Dropdown
                menu={{
                  items,
                }}
                placement="top"
              >
                <Button> {user?.username || ""}</Button>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ backgroundColor: "#F0F3F" }}>
            <div>
              <Outlet />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={["fade", "scale"]}
              />
              {/* Same as */}
              <ToastContainer />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default layoutAdmin;
