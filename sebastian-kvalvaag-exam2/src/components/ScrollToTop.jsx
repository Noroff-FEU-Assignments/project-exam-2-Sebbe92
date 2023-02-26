import React, { useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function ScrollToTop(props) {
  const toTopBtnRef = useRef();

  const scrollDetector = () => {
    if (window.pageYOffset > 200) {
      toTopBtnRef.current.classList.add("show");
    } else {
      toTopBtnRef.current.classList.remove("show");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollDetector);
  }, []); // eslint-disable-line
  return (
    <Button
      variant="primary"
      className="scroll-to-top-btn position-fixed z-index-10"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      ref={toTopBtnRef}
    >
      To Top
    </Button>
  );
}
