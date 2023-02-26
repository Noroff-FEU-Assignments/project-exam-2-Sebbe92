import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

import { useLocation } from "react-router";

import Post from "../components/Post";

export default function Posts() {
  const http = useAxios();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const getPost = async () => {
    try {
      const response = await http.get(
        `posts/${id}?_author=true&_reactions=true&_comments=true`
      );
      setPost(await response.data);
    } catch (error) {
      setError("Error: " + error.response.data.status);
    }
  };

  useEffect(() => {
    if (post) return;
    getPost();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex flex-column justify-content-center mt-nav-h ">
      {error ? (
        <>{error}</>
      ) : post ? (
        <>
          <Post>{post}</Post>{" "}
          {post.reactions ? (
            post.reactions.map((reaction) => (
              <h3>
                {reaction.symbol} {reaction.count}
              </h3>
            ))
          ) : (
            <></>
          )}{" "}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
