import useAxios from "../hooks/useAxios";
import { useEffect, useState, useRef } from "react";
import Post from "../components/Post";
import CenteredModal from "../components/CenteredModal";
import ModalContext from "../context/ModalContext";

const postLimit = 10;

export default function Home() {
  const http = useAxios();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentModal, setCommentModal] = useState({ show: false, id: null });
  const postsRef = useRef(null);

  const getPosts = async (page) => {
    try {
      setError(null);
      setLoading(true);
      const response = await http.get(
        `/posts?limit=${postLimit}&offset=${
          postLimit * page
        }&_author=true&_comments=true&&_reactions=true`
      );
      if (posts) {
        const temp = posts.concat(response.data);
        setPosts(temp);
      } else {
        setPosts(response.data);
      }
    } catch (error) {
      setError(
        error.response.data.status,
        "try waiting 20 sec then refresh the page"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    getPosts(page + 1);
    setPage(page + 1);
  };

  //creates an oberserver that loads more posts when in view
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMorePosts();
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1 }
  );

  useEffect(() => {
    if (postsRef.current.children[0]) {
      observer.observe(Array.from(postsRef.current.children).at(-1));
    }
    if (posts) return;
    getPosts(0);
  }, [posts]); // eslint-disable-line

  return (
    <>
      <ModalContext.Provider value={[commentModal, setCommentModal]}>
        <div className="d-flex flex-column justify-content-center mt-nav-h">
          <CenteredModal commentModal={commentModal} />
          <div className="mt-2  position-relative">
            {error ? <>Looks like there was an error : {error}</> : <></>}
            <div
              ref={postsRef}
              className="d-flex flex-column align-items-center"
            >
              {posts ? (
                posts.map((post, i) => (
                  <Post key={`${post.id}${i}`}>{post}</Post>
                ))
              ) : (
                <></>
              )}
            </div>
            {loading ? <>loading...</> : <></>}
          </div>
        </div>
      </ModalContext.Provider>
    </>
  );
}
