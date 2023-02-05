import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import PostForm from "./submenus/PostForm";
import addProfileIcon from "../../icons/add-people.svg";
import addPostIcon from "../../icons/add-post.svg";
import followingIcon from "../../icons/following.svg";
import settingsIcon from "../../icons/settings.svg";
import FindProfile from "./submenus/FindProfile";
import Following from "./submenus/Following";
import Settings from "./submenus/Settings";
import MenuContext from "../../context/MenuContext";

export default function Menu({ name, ...props }) {
  const [currentMenu, setCurrentMenu] = useContext(MenuContext);
  console.log(currentMenu);
  return (
    <>
      <Offcanvas {...props} className="menu bg-info">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Post</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="d-flex flex-column sec-nav-btns-x sec-nav-btns-y  position-absolute">
          <Button
            className="side-nav_button mb-2"
            variant="secondary"
            onClick={() => {
              setCurrentMenu(1);
            }}
          >
            <img src={addPostIcon} alt="add post icon" />
          </Button>
          <Button
            className="side-nav_button mb-2"
            variant="secondary"
            onClick={() => {
              setCurrentMenu(2);
            }}
          >
            <img src={addProfileIcon} alt="add profile icon" />
          </Button>
          <Button
            className="side-nav_button mb-2"
            variant="secondary"
            onClick={() => {
              setCurrentMenu(3);
            }}
          >
            <img src={followingIcon} alt="following icon" />
          </Button>
          <Button
            className="side-nav_button mb-2"
            variant="secondary"
            onClick={() => {
              setCurrentMenu(4);
            }}
          >
            <img src={settingsIcon} alt="settings icon" />
          </Button>
        </div>
        <Offcanvas.Body className="pt-0">
          {(() => {
            switch (currentMenu) {
              case 1:
                return <PostForm />;
              case 2:
                return <FindProfile />;
              case 3:
                return <Following />;
              case 4:
                return <Settings />;
            }
          })()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
