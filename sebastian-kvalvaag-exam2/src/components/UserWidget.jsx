import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import defaultAvatar from "../images/placeholder.png";

export default function UserWidget() {
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
    <a
      href={`profile?name=${user.name}`}
      className="user-widget d-flex bg-secondary rounded text-white ps-3 position-absolute end-0 mw-50"
    >
      <div className="me-4 my-2">
        <div className="mt-1">
          <h2 className="fs-4 m-0">{user.name}</h2>
        </div>
        <div className="d-flex justify-content-center fs-7">
          <Button
            variant="secondary"
            className="p-0 mt-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleShow();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="user-image bg-primary">
        <img src={user.avatar ? user.avatar : defaultAvatar} alt="avatar" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
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
    </a>
  );
}
