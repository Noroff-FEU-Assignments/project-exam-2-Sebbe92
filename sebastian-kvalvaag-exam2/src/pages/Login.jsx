import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserContext from "../context/UserContext";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router";

export default function Login() {
  const http = useAxios();
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  async function login(email, password) {
    try {
      const response = await http.post("/auth/login", {
        email: email,
        password: password,
      });
      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="welcome-card p-5">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          login(e.target[0].value, e.target[1].value);
        }}
      >
        <Form.Group className="mb-3" controlId="login-email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@noroff.no" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login-password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="**************" />
        </Form.Group>
        <div>Form error</div>
        <div className="d-flex">
          <a href="sign-up">
            You don't have an account? <br /> Sign up!
          </a>
          <Button type="submit">LOGIN</Button>
        </div>
      </Form>
    </div>
  );
}
