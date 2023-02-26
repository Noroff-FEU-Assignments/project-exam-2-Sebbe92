import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/socialhub-logo.png";

export default function BasicNav() {
  return (
    <Navbar bg="transparent" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex flex-column bg-primary bg-opacity-75 align-items-center">
            <Nav.Link href="/login" className="text-white">
              Login
            </Nav.Link>
            <Nav.Link href="/signup" className="text-white">
              Sign-up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
