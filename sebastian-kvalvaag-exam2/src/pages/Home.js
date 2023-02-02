import React from "react";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Button from "react-bootstrap/Button";

const postLimit = 20;

export default function Home() {
  const http = useAxios();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);

  async function getPosts(page) {
    try {
      const response = await http.get(
        `/posts?limit=${postLimit}&offset=${page}&_author=true`
      );
      if (posts) {
        const temp = posts.concat(response.data);
        console.log(temp);
        setPosts(temp);
      } else {
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loadMorePosts() {
    getPosts(page + postLimit);
    setPage(page + postLimit);
  }

  useEffect(() => {
    getPosts(0);
    console.log(posts);
  }, []);
  return (
    <>
      <div className="d-flex flex-column justify-content-center mt-nav-h">
        <div className="mt-2">
          {posts ? (
            posts.map((post) => <Post key={post.id}>{post}</Post>)
          ) : (
            <>loading...</>
          )}
        </div>
      </div>
      <Button onClick={loadMorePosts}>more posts</Button>
    </>
  );
}
