import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../../Redux/Reducer/userSlice";
import AuthService from "../../../../Services/AuthService";
import logo from "../../../../assets/logo.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = async () => {
    try {
      await AuthService.logoutApi();
      dispatch(doLogoutAction());
      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  const items = [
    {
      label: (
        <Link
          to={user?.inforUser?.position === "Giam doc" ? "/admin" : "/user"}
          className={`${cx("dropdownItem")} text-decoration-none`}
        >
          Thông tin cá nhân
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <p className={cx("dropdownItem")} onClick={handleLogout}>
          Đăng xuất
        </p>
      ),
      key: "1",
    },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className={cx("imgLogo")} src={logo} alt="Logo" />
          <p className={cx("textLogo")}>ITC GROUP</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="" style={{ flexWrap: "wrap" }}>
            <Nav.Link
              as={Link}
              to="/"
              className={cx("navLink", { active: url === "/" })}
            >
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <div className={cx("username")}>
              Welcome to
              <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user?.username || ""}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-decoration-none">
              <button className={cx("btnLogin")}>Login</button>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
