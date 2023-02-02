import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import UserWidget from "../UserWidget";

export default function TopNav(props) {
  return (
    <Navbar bg="primary" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="text-white text-center">
          Social
          <br />
          Hub
        </Navbar.Brand>
        <UserWidget user={props.user} />
      </Container>
    </Navbar>
  );
}
