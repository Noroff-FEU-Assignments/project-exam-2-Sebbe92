import React from "react";
import { Button } from "react-bootstrap";

export default function Welcome() {
  return (
    <div className="welcome-card bg-info bg-opacity-75 py-4 mx-2">
      <div className="mt-2 mb-5">
        <h1 className="text-center mb-3">Welcome to Social Hub</h1>
        <p className="mx-auto text-center w-75 ">
          This is a school project and is not optimized for production. Use Wifi
          if possible, there might be some big images loaded
        </p>
      </div>
      <div className="w-100 d-flex justify-content-around">
        <Button
          href="/login"
          className="fs-4 px-5 border-1 border-white"
          variant="secondary"
        >
          Login
        </Button>
        <Button
          href="/signup"
          className="fs-4 px-5 border-1 border-white"
          variant="secondary"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
