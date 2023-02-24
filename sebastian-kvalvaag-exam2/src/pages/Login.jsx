import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserContext from "../context/UserContext";
import useAxios from "../hooks/useAxios";

import InputGroup from "react-bootstrap/InputGroup";

export default function Login() {
  const http = useAxios();

  const setUser = useContext(UserContext);
  const [inputsIsValid, setInputsIsNotValid] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(null);

  const redirect = (path) => {
    window.location.href = path;
  };

  const validateInput = () => {
    if (email && password.length > 2) {
      setInputsIsNotValid(false);
      return true;
    }
    setInputsIsNotValid(true);
    return false;
  };
  async function login(email, password) {
    const fullEmail = email + "@stud.noroff.no";
    try {
      const response = await http.post("/auth/login", {
        email: fullEmail,
        password: password,
      });
      setUser[1](response.data);
      redirect("/");
    } catch (error) {
      setLoginError(error.response.data.errors[0].message);
    }
  }
  return (
    <>
      <div className="welcome-card bg-info bg-opacity-75 px-5 py-4">
        <h1 className="text-center">Login</h1>
        <Form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target[0].value, e.target[1].value);
          }}
        >
          <Form.Group className="mb-3" controlId="sign-up-email">
            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email prefix"
                aria-label="email prefix"
                aria-describedby="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateInput();
                }}
              />
              <InputGroup.Text id="email" className="bg-primary">
                @stud.noroff.no
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="login-password"
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput();
            }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            disabled={inputsIsValid}
            className="w-100"
          >
            Login
          </Button>
          <Form.Text>{loginError}</Form.Text>
        </Form>
        <div className="d-flex flex-column">
          <p className="mb-0 mt-2 ">You don't have an account? </p>

          <a href="signup" className="text-white hover-underline">
            Sign up!
          </a>
        </div>
      </div>
    </>
  );
}
