import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../hooks/useAxios";
import InputGroup from "react-bootstrap/InputGroup";

export default function SignUpForm() {
  const http = useAxios();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  //error handling
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);

  const redirect = (path) => {
    console.log(path);
    window.location.href = path;
  };
  const register = async () => {
    if (nameError || emailError || passwordError || repeatPasswordError) return;
    try {
      const fullEmail = email + "@stud.noroff.no";
      const newUser = { name, email: fullEmail, password };
      console.log(newUser);
      const response = await http.post("auth/register", newUser);
      console.log(response);
      redirect("/login");
      return response;
    } catch (error) {
      console.log(error);
      setFormError(error.response.data.errors[0].message);
    }
  };

  const validateInput = (input) => {
    switch (input.id) {
      case "sign-up-repeat-password":
        if (password !== input.value) {
          setRepeatPasswordError("password does not match");
        } else {
          setRepeatPasswordError(null);
        }
        break;
      case "sign-up-password":
        if (input.value.length < 8) {
          setPasswordError("Password must be at least 8 characters long");
        } else if (!input.value) {
          console.log("fix");
        } else {
          setPasswordError(null);
        }
        break;
      case "sign-up-email":
        if (typeof input.value !== "string") {
          setEmailError("email must be a string");
        }
        break;
      case "sign-up-name":
        if (input.value.length < 3) {
          setNameError("Name must have at least 3 characters");
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="p-5 my-auto">
      <Form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          if (password === repeatPassword && name && email) {
            register();
          } else {
            setFormError(
              "all fields must be filled out and comply with guidelines"
            );
          }
        }}
      >
        <Form.Group className="mb-3" controlId="sign-up-username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="User123"
            onChange={(e) => {
              validateInput(e.target);
              setName(e.target.value);
            }}
          />
          <Form.Text>{nameError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-email">
          <Form.Label>Email</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email prefix"
              aria-label="email prefix"
              aria-describedby="email"
              onChange={(e) => {
                validateInput(e.target);
                console.log(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <InputGroup.Text id="email" className="bg-primary">
              @stud.noroff.com
            </InputGroup.Text>
          </InputGroup>
          <Form.Text>{emailError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="do not use Password123"
            onChange={(e) => {
              validateInput(e.target);
              setPassword(e.target.value);
            }}
          />
          <Form.Text>{passwordError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-up-repeat-password">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="do not use Password123"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              validateInput(e.target);
            }}
          />
          <Form.Text className="text-danger">{repeatPasswordError}</Form.Text>
        </Form.Group>
        <div className="d-flex flex-column">
          <Button type="submit" variant="success">
            Sign Up
          </Button>
          <Form.Text>{formError}</Form.Text>
          <Button
            variant="danger"
            onClick={() => {
              redirect("/");
            }}
          >
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
}
