import React from "react";
import { Button } from "react-bootstrap";

export default function Welcome() {
  return (
    <div>
      Welcome
      <Button href="/login">Login</Button>
      <Button href="/signup">Sign Up</Button>
    </div>
  );
}
