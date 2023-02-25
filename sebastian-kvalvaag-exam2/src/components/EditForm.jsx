import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../hooks/useAxios";
import { Modal } from "react-bootstrap";

export default function EditForm(props) {
  const http = useAxios();
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [media, setMedia] = useState(null);
  const [body, setBody] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formRef = useRef();
  const getPost = async () => {
    try {
      const response = await http.get(`/posts/${props.id}`);
      setPost(response.data);
    } catch (error) {
      setError(error.data.errors[0].message);
    }
  };
  const updatePost = async () => {
    //update post
    const newTitle = title ? title : post.title;
    const newTags = tags ? tags : post.tags;
    const newMedia = media ? media : post.media;
    const newBody = body ? body : post.body;
    const updatedPost = {
      title: newTitle,
      tags: newTags,
      media: newMedia,
      body: newBody,
    };

    try {
      const response = await http.put(`/posts/${props.id}`, updatedPost);
      console.log(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (id) => {
    try {
      const response = await http.delete(`/posts/${id}`);
      alert("post deleted");
      console.log(response);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!post) {
      getPost();
    }
  }, []); //eslint-disable-line

  return (
    <div>
      {post ? (
        <Form className="" ref={formRef}>
          <Form.Group className="mb-3" controlId="post-form-title">
            <Form.Label>Title(required)</Form.Label>
            <Form.Control
              defaultValue={post.title}
              type="text"
              placeholder="Post title.."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="post-form-tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              defaultValue={post.tags.join()}
              type="text"
              placeholder="Funny Tech pools etc. "
              onChange={(e) => {
                setTags(e.target.value.split(" "));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="post-form-tags">
            <Form.Label>Media</Form.Label>
            <Form.Control
              defaultValue={post.media}
              type="text"
              placeholder="Image url"
              onChange={(e) => {
                setMedia(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="post-form-tags">
            <Form.Label>Post body(required)</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              defaultValue={post.body}
              placeholder="Hello world! My name is {generic.name}, and i am interested in {generic.interests}"
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </Form.Group>
          {error ? (
            <Form.Text className="text-muted">{error}</Form.Text>
          ) : (
            <></>
          )}

          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              onClick={() => {
                updatePost();
              }}
            >
              Post
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleShow();
              }}
            >
              Delete
            </Button>
          </div>
        </Form>
      ) : (
        <>Loading</>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Delete this post?
          {post ? post.title : "error?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deletePost(post.id);
              handleClose();
            }}
          >
            Delete
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
