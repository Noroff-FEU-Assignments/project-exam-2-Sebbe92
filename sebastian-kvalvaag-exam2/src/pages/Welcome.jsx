import React from "react";
import { Button } from "react-bootstrap";

export default function Welcome() {
  return (
    <div className="welcome-card py-3 mx-2">
      <div className="my-2">
        <h1 className="text-center">Welcome to Social Hub</h1>
        <p className="mx-auto text-center w-75">
          This is a school project and is not optimized for production. Use Wifi
          if possible, there might be some big images loaded
        </p>
      </div>
      <div className="w-100 d-flex justify-content-around">
        <Button href="/login" className="fw-bold fs-4">
          Login
        </Button>
        <Button href="/signup" className="fs-4">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
