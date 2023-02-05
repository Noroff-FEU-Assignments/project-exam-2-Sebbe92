import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useAxios from "../hooks/useAxios";

export default function CommentForm(props) {
  const http = useAxios();
  const [comment, setComment] = useState();

  const postComment = async () => {
    try {
      const response = await http.post(`posts/${props.id}/comment`, {
        body: comment,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
    </Form>
  );
}
