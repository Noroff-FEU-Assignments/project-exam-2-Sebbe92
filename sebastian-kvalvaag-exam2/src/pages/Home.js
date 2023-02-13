import React from "react";
import useAxios from "../hooks/useAxios";
import { useEffect, useState, useRef } from "react";
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
  const postRef = useRef(null);

  async function getPosts(page) {
    try {
      const response = await http.get(
        `/posts?limit=${postLimit}&offset=${page}&_author=true&_comments=true`
      );
      if (posts) {
        const temp = posts.concat(response.data);
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
  const lastPostObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      loadMorePosts();
      lastPostObserver.unobserve(entry.target);
    }
  });
  useEffect(() => {
    if (!posts) {
      getPosts(0);
    } else {
      console.log(postRef);
      lastPostObserver.observe(
        Array.from(postRef.current.children)[
          postRef.current.children.length - 1
        ]
      );
    }
  }, [posts]);
  return (
    <ModalContext.Provider value={[commentModal, setCommentModal]}>
      <div className="d-flex flex-column justify-content-center mt-nav-h">
        <CenteredModal commentModal={commentModal} />

        {posts ? (
          <div className="mt-2" ref={postRef}>
            {posts.map((post) => (
              <Post key={post.id}>{post}</Post>
            ))}
          </div>
        ) : (
          <>loading...</>
        )}
      </div>
      <></>
      <Button onClick={loadMorePosts}>more posts</Button>
    </ModalContext.Provider>
  );
}
/* function PostObserver({ postRef, callback }) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 0.1 });

    Array.from(postRef.current.children).forEach((post, i) => {
      observer.observe(post);
    });
  }, [postRef]);

  return null;
} */
