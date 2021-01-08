import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const Main = ({ user }) => {
  if (user.name === undefined) {
    return <Redirect to='/' />;
  }
  console.log(user);
  return (
    <div id='main'>
      <Container className='pt-5'>
        <h1>Assignments and Benchmarks</h1>
        <Row md={3} lg={4}>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Entrance Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 1 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 2 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 3 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 4 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 5 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 6 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className='mt-5'>
            <Card>
              <Card.Img variant='top' src='http://strive.school/assets/images/smile.jpg' />
              <Card.Body>
                <Card.Title>Benchmark 7 Assesment Test</Card.Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae, consequuntur debitis volupt.</p>
                <Link to='/assessment/id'>
                  <Button variant='success'>Take test</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
