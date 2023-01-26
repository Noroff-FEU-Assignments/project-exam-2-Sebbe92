import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import UserWidget from "./UserWidget";

export default function TopNav() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          Social
          <br />
          Hub
        </Navbar.Brand>
        <UserWidget />
      </Container>
    </Navbar>
  );
}
