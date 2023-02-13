import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../hooks/useAxios";

export default function SignUpForm() {
  const http = useAxios();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = async () => {
    const newUser = { name, email, password };
    const response = await http.post("auth/register", newUser);
    console.log(response);
  };
  return (
    <div className="p-5 my-auto">
      <Form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          if (password == repeatPassword && name && email) {
            register();
          } else {
            console.log(name, email, password, repeatPassword);
          }
        }}
      >
        <Form.Group className="mb-3" controlId="sign-up-username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="User123"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="user123@noroff.no"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="do not use Password123"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-repeat-password">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="do not use Password123"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div>Form error</div>

        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}
