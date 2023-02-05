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
        <Navbar.Brand
          href="#home"
          className="text-white text-center"
          onClick={() => {
            setPage({ page: "home" });
          }}
        >
          Social
          <br />
          Hub
        </Navbar.Brand>
        <UserWidget user={props.user} />
      </Container>
    </Navbar>
  );
}
