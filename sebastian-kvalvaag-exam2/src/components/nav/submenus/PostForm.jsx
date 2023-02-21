import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../../../hooks/useAxios";

export default function PostForm() {
  const http = useAxios();
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [media, setMedia] = useState(null);
  const [body, setBody] = useState(null);
  const [titleError, setTitleError] = useState();
  const [tagsError, setTagsError] = useState();
  const [mediaError, setMediaError] = useState();
  const [bodyError, setBodyError] = useState();

  const formRef = useRef();
  const postObject = { title, tags, media, body };
  const post = async () => {
    try {
      const response = await http.post("posts", postObject);
      console.log(response);
    } catch (error) {
      setMediaError(error.response.data.errors[0]);
    }
  };
  const testPost = (post) => {
    if (post.title.length < 3) {
      setTitleError("Title must be at least 3 characters long");
      return false;
    } else {
      setTitleError("");
    }
    if (post.tags) {
      if (post.tags < 5) {
        console.log(post.tags.length);
        setTagsError("No more that 5 tags allowed");
        return false;
      } else {
        setTagsError("");
      }
    }
    if (post.media) {
    }
    if (!post.body) {
      setBodyError("body is required");
      return false;
    }
    return true;
  };
  const clearForm = (form) => {
    form.children[0].children[1].value = "";
    form.children[1].children[1].value = "";
    form.children[2].children[1].value = "";
    form.children[3].children[1].value = "";
  };

  return (
    <Form className="" ref={formRef}>
      <Form.Group className="mb-3" controlId="post-form-title">
        <Form.Label>Title(required)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Post title.."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Form.Text className="">{titleError ? titleError : ""}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="post-form-tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="Funny Tech pools etc. "
          onChange={(e) => {
            setTags(e.target.value.split(" " || ","));
          }}
        />
        <Form.Text className="">{tagsError ? tagsError : ""}</Form.Text>
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
        <Form.Text className="">{mediaError ? mediaError : ""}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="post-form-tags">
        <Form.Label>Post body(required)</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          placeholder="Hello world! My name is {generic.name}, and i am interested in {generic.interests}"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <Form.Text className="">{bodyError ? bodyError : ""}</Form.Text>
      </Form.Group>
      <Button
        variant="success"
        onClick={() => {
          if (testPost(postObject)) {
            post();
            clearForm(formRef.current);
          }
        }}
      >
        Post
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          clearForm(formRef.current);
        }}
      >
        Clear
      </Button>
    </Form>
  );
}
