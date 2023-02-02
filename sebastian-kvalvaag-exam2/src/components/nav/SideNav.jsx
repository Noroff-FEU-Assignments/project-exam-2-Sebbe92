import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Menu from "./Menu";
import addProfileIcon from "../../icons/add-people.svg";
import addPostIcon from "../../icons/add-post.svg";
import followingIcon from "../../icons/following.svg";
import settingsIcon from "../../icons/settings.svg";

export default function SideNav() {
  const [currentMenuPage, setCurrentMenuPage] = useState("post");
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="position-fixed  end-0 center d-flex flex-column sec-nav-btns-y">
      <Button
        className="side-nav_button mb-2"
        onClick={() => {
          handleShow();
          setCurrentMenuPage();
        }}
        variant="secondary"
      >
        <img src={addPostIcon} alt="add post icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={handleShow}
        variant="secondary"
      >
        <img src={addProfileIcon} alt="add profile icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={handleShow}
        variant="secondary"
      >
        <img src={followingIcon} alt="following icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={handleShow}
        variant="secondary"
      >
        <img src={settingsIcon} alt="settings icon" className="icon" />
      </Button>
      <Menu show={show} onHide={handleClose} placement="end" />
    </div>
  );
}
