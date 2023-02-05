import React, { useContext, useEffect, useState, useRef } from "react";

import useAxios from "../hooks/useAxios";
import UserContext from "../context/UserContext";
import Overlay from "react-bootstrap/Overlay";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import defaultAvatar from "../images/placeholder.png";

export default function UserWidget(props) {
  const [user, setUser] = useContext(UserContext);

  //logout modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function logout() {
    setUser(null);
  }
  console.log(user);
  return (
    <div className="user-widget d-flex bg-secondary rounded text-white ps-3 position-absolute end-0">
      <div className="me-4 my-2">
        <div className="mt-1">
          <h2 className="fs-4 m-0">{user.name}</h2>
        </div>
        <div className="d-flex justify-content-center fs-7">
          <a
            onClick={(e) => {
              e.preventDefault();
              handleShow();
            }}
          >
            Logout
          </a>
        </div>
      </div>
      <div className="user-image">
        <img src={user.avatar ? user.avatar : defaultAvatar} alt="avatar" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              logout();
            }}
          >
            Logout
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
