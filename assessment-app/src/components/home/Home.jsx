import React from "react";
import { Button, Container, Jumbotron, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./home.css";

const Home = ({ user }) => {
  if (user.name) {
    return <Redirect to='/main' />;
  }

  return (
    <div id='home'>
      <Jumbotron fluid>
        <Container className='pt-5'>
          <h1 className='text'>Welcome to strive school</h1>
          <p>This is strive schools Assessment & Benchmarking platform</p>
          <h3>Log in or sign Up to take tests</h3>

          <Link to='/signUp'>
            <Button className='w-25 mr-4' type='link' id='sign in' variant='success'>
              Sign up
            </Button>
          </Link>
          <Link to='/logIn'>
            <Button className='w-25' type='link' id='sign in' variant='success'>
              Log In
            </Button>
          </Link>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
