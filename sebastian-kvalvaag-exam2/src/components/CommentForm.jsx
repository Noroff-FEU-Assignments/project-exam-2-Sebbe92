import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useAxios from "../hooks/useAxios";

export default function CommentForm(props) {
  const http = useAxios();
  const [comment, setComment] = useState();
  const [error, setError] = useState(null);
  const postComment = async () => {
    try {
      const response = await http.post(`posts/${props.id}/comment`, {
        body: comment,
      });
      setError("success");
      window.location.reload(false);
      return response;
    } catch (error) {
      setError(error.response.data.errors[0].message);
      console.log(error.response.data.errors[0]);
    }
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        postComment();
      }}
    >
      <Form.Group controlId="comment-body">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </Form.Group>
      <Button type="submit">Post</Button>
      <Form.Text>{error}</Form.Text>
    </Form>
  );
}
