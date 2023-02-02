import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../../../hooks/useAxios";

export default function PostForm() {
  const http = useAxios();
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [media, setMedia] = useState(null);
  const [body, setBody] = useState(null);
  const postObject = { title, tags, media, body };
  const post = async () => {
    try {
      const response = await http.post("posts", postObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const titleError = "";
  return (
    <Form className="">
      <Form.Group className="mb-3" controlId="post-form-title">
        <Form.Label>Title(required)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Post title.."
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(postObject);
          }}
        />
        <Form.Text className="text-muted">{titleError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="post-form-tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="Funny Tech pools etc. "
          onChange={(e) => {
            setTags(e.target.value.split(" "));
          }}
        />
        <Form.Text className="text-muted">{titleError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="post-form-tags">
        <Form.Label>Media</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image url"
          onChange={(e) => {
            setMedia(e.target.value);
          }}
        />
        <Form.Text className="text-muted">{titleError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="post-form-tags">
        <Form.Label>Post body(required)</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          placeholder="Hello world! My name is {generic.name}, and i am interested in {generic.interests}"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <Form.Text className="text-muted">{titleError}</Form.Text>
      </Form.Group>
      <Button
        variant="success"
        onClick={() => {
          post();
        }}
      >
        Post
      </Button>
      <Button variant="danger">Clear</Button>
    </Form>
  );
}
