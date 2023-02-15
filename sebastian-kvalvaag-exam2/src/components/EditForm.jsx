import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../hooks/useAxios";

export default function EditForm(props) {
  const http = useAxios();
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [media, setMedia] = useState(null);
  const [body, setBody] = useState(null);
  const [post, setPost] = useState(null);

  const getPost = async () => {
    const response = await http.get(`/posts/${props.id}`);
    setPost(response.data);
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
    console.log(props.id);
    console.log(updatedPost);
    try {
      const response = await http.put(`/posts/${props.id}`, updatedPost);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const titleError = "lol fix asap";
  useEffect(() => {
    if (!post) {
      getPost();
    }
  }, []); //eslint-disable-line

  return (
    <div>
      {post ? (
        <Form className="">
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
            <Form.Text className="text-muted">{titleError}</Form.Text>
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
            <Form.Text className="text-muted">{titleError}</Form.Text>
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
            <Form.Text className="text-muted">{titleError}</Form.Text>
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
            <Form.Text className="text-muted">{titleError}</Form.Text>
          </Form.Group>
          <Button
            variant="success"
            onClick={() => {
              updatePost();
            }}
          >
            Post
          </Button>
          <Button variant="danger">Clear</Button>
        </Form>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
