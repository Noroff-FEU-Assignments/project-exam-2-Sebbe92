import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalContext from "../context/ModalContext";

export default function CenteredModal(props) {
  const [commentModal, setCommentModal] = useContext(ModalContext);
  console.log(commentModal);
  return (
    <Modal
      variant="info"
      className=""
      show={commentModal.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-info">{commentModal.id}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => {
            setCommentModal({ show: false, id: null });
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
