import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Menu from "./Menu";
import addProfileIcon from "../../icons/add-people.svg";
import addPostIcon from "../../icons/add-post.svg";
import followingIcon from "../../icons/following.svg";
import settingsIcon from "../../icons/settings.svg";
import MenuContext from "../../context/MenuContext";

export default function SideNav() {
  const setCurrentMenuPage = useContext(MenuContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="position-fixed end-0 center d-flex flex-column sec-nav-btns-y z-index-10">
      <Button
        className="side-nav_button mb-2"
        onClick={() => {
          setCurrentMenuPage[1](1);
          handleShow();
        }}
        variant="secondary"
      >
        <img src={addPostIcon} alt="add post icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={() => {
          setCurrentMenuPage[1](2);
          handleShow();
        }}
        variant="secondary"
      >
        <img src={addProfileIcon} alt="add profile icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={() => {
          setCurrentMenuPage[1](3);
          handleShow();
        }}
        variant="secondary"
      >
        <img src={followingIcon} alt="following icon" className="icon" />
      </Button>
      <Button
        className="side-nav_button mb-2"
        onClick={() => {
          setCurrentMenuPage[1](4);
          handleShow();
        }}
        variant="secondary"
      >
        <img src={settingsIcon} alt="settings icon" className="icon" />
      </Button>

      <Menu show={show} onHide={handleClose} placement="end" />
    </div>
  );
}
