import "../Header/header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handLogin = () => {
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="test">
          {/* <img className="logo" src="../../../../assets/logo.png" alt="" /> */}
          <p className="text">ITC</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="Narbar-nav">
            <NavLink to="/user" className="nav-link ">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link ">
              Admin
            </NavLink>
          </Nav>
          <Nav className="nav-Setiing">
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Log In</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sign In</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Profile</NavDropdown.Item>
            </NavDropdown> */}
            <NavLink
              to="/login"
              className="nav-link "
              onClick={() => handLogin()}
            >
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
