import React, { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { getFunction } from "../CRUDFunctions";
import { checkEmail, checkPassword } from "../validationUntilites";
import { Link, Redirect } from "react-router-dom";
import "./logInSignUp.css";

const LogIn = ({ getId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setError] = useState({ email: 0, password: 0 });
  const [errMessage, setErrMessage] = useState("");

  const checkForm = (e) => {
    e.preventDefault();
    getUser();
  };
  const getUser = async () => {
    const allUsers = await getFunction("candidates");
    console.log(allUsers);
    if (allUsers) {
      const user = allUsers.find((user) => user.email === email && user.password === password);
      if (user) {
        getId(user._id);
        setRedirect(true);
      } else {
        setErrMessage("Email or password are incorrect");
      }
    }
  };
  if (redirect) {
    return <Redirect to='/main' />;
  }
  return (
    <Container>
      <Row id='logIn'>
        <h2>Log In</h2>

        <Container>
          <Form onSubmit={checkForm}>
            <small className={errMessage ? "text-danger" : "d-none"}> {errMessage}</small>
            <Form.Group>
              <Form.Label htmlFor='email'>Your email address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                placeholder='example@example.com'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                onBlur={(e) => setError({ email: !checkEmail(e.currentTarget.value) })}
                className={errors.email ? "error" : ""}
                required
              />
              <small className={errors.email ? "text-danger" : "d-none"}>Email should include @ . and be longer than 4 chars</small>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='password'>Your password </Form.Label>
              <Form.Control
                type='password'
                name='password'
                id='password'
                autoComplete='new-password'
                placeholder='New Password'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                onBlur={(e) => setError({ password: !checkPassword(e.currentTarget.value) })}
                className={errors.password ? "error" : ""}
                required
              />
              <small className={errors.password ? "text-danger" : "d-none"}>Password should be longer than 8 chars, 1 digit, 1 letter</small>
            </Form.Group>
            <Row>
              <Button className='w-50 mt-4' type='submit' id='sign in' variant='success'>
                Log in
              </Button>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default LogIn;
