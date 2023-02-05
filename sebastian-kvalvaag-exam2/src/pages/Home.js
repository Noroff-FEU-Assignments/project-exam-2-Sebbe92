import React from "react";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Button from "react-bootstrap/Button";
import CenteredModal from "../components/CenteredModal";
import ModalContext from "../context/ModalContext";
const postLimit = 20;

export default function Home() {
  const http = useAxios();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);
  const [commentModal, setCommentModal] = useState({ show: false, id: null });

  async function getPosts(page) {
    try {
      const response = await http.get(
        `/posts?limit=${postLimit}&offset=${page}&_author=true&_comments=true`
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
  const handleCommentModalShow = (id) => {
    setCommentModal({ show: true, id: id });
  };
  const handleCommentModalClose = () => {
    setCommentModal({ show: false, id: null });
  };

  useEffect(() => {
    getPosts(0);
    console.log(posts);
  }, []);
  return (
    <ModalContext.Provider value={[commentModal, setCommentModal]}>
      <div className="d-flex flex-column justify-content-center mt-nav-h">
        <CenteredModal commentModal={commentModal} />
        <div className="mt-2">
          {posts ? (
            posts.map((post) => <Post key={post.id}>{post}</Post>)
          ) : (
            <>loading...</>
          )}
        </div>
      </div>
      <Button onClick={loadMorePosts}>more posts</Button>
    </ModalContext.Provider>
  );
}
