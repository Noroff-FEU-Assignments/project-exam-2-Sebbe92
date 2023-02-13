import { useEffect } from "react";

export default function PostObserver({ postRef, callback }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      entry.target.classList.add("show");
      console.log(entry);
    });
    if (postRef) {
      Array.from(postRef.current.children).forEach((post) => {
        console.log(post);
        observer.observe(post);
      });
    }
  }, []);

  return null;
}
