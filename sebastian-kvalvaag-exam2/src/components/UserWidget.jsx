import React from "react";
import testImg from "../images/test-img.jpg";

export default function UserWidget() {
  return (
    <div className="user-widget d-flex bg-primary rounded text-white ps-3">
      <div className="mx-3">
        <div className="mt-1">
          <h2 className="fs-6 m-0">Username123</h2>
          <p className="m-0 fs-7">username@noroff.no</p>
        </div>
        <div className="d-flex justify-content-center fs-7">
          <a>Logout</a>
        </div>
      </div>
      <div className="user-image ms-3">
        <img src={testImg} alt="sebastian kvalvaag" />
      </div>
    </div>
  );
}
