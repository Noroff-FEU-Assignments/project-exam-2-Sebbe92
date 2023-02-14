import useAxios from "../hooks/useAxios";
import { useEffect, useState, useRef, useCallback } from "react";
import Post from "../components/Post";
import CenteredModal from "../components/CenteredModal";
import ModalContext from "../context/ModalContext";
const postLimit = 10;

export default function Home() {
  const http = useAxios();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);
  const [commentModal, setCommentModal] = useState({ show: false, id: null });
  const postsRef = useRef(null);

  /*  const handleCommentModalShow = (id) => {
    setCommentModal({ show: true, id: id });
  };
  const handleCommentModalClose = () => {
    setCommentModal({ show: false, id: null });
  }; */
  const getPosts = useCallback(
    async (page) => {
      try {
        const response = await http.get(
          `/posts?limit=${postLimit}&offset=${
            postLimit * page
          }&_author=true&_comments=true`
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
    },
    [http, posts]
  );
  const loadMorePosts = useCallback(() => {
    getPosts(page + 1);
    setPage(page + 1);
  }, [getPosts, page]);

  useEffect(() => {
    if (postsRef.current.children[0]) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            loadMorePosts();
            console.log("yes");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(Array.from(postsRef.current.children).at(-1));
    }

    if (posts) return;
    getPosts(0);
  }, [posts]); // eslint-disable-line

  return (
    <ModalContext.Provider value={[commentModal, setCommentModal]}>
      <div className="d-flex flex-column justify-content-center mt-nav-h">
        <CenteredModal commentModal={commentModal} />
        <div className="mt-2">
          <div ref={postsRef}>
            {posts ? (
              posts.map((post, i) => <Post key={`${post.id}${i}`}>{post}</Post>)
            ) : (
              <>loading...</>
            )}
          </div>
        </div>
      </div>
      <></>
    </ModalContext.Provider>
  );
}
