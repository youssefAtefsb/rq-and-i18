import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";

const { t, i18n } = useTranslation();

const Main = () => {
  return (
    <Container>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React-Query</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                {t("Home")}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mt-5">
        <Outlet />
      </div>
    </Container>
  );
};

export default Main;