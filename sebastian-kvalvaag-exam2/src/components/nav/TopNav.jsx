import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import UserWidget from "../UserWidget";
import PageContext from "../../context/PageContext";

export default function TopNav(props) {
  const [page, setPage] = useContext(PageContext);
  return (
    <Navbar bg="primary" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="text-white text-center">
          Social
          <br />
          Hub
        </Navbar.Brand>
        <UserWidget user={props.user} />
      </Container>
    </Navbar>
  );
}
