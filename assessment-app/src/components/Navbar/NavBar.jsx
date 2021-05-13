import React, { useEffect, useState } from "react";
import { Navbar, ButtonGroup, Image, Nav, Dropdown, Button, Container, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./navBar.css";
const NavBar = ({ location, user, logOut }) => {
  const [login, setlogin] = useState(true);
  useEffect(() => {
    setlogin(!login);
  }, [user]);
  if (location.pathname === "/logIn" || location.pathname === "/signUp" || location.pathname.includes("/assessment") || location.pathname === "/office") {
    return (
      <div className='p-3'>
        <Link to='/'>
          <Image style={{ height: "45px" }} src='https://strive.school/assets/strive_white.png' alt='Strive Logo' />
        </Link>
      </div>
    );
  }
  return (
    <div id='navBar'>
      <Navbar bg='dark' className='navbar mb-0' expand='lg'>
        <Container>
          <Link to='/'>
            <Image style={{ height: "35px" }} src='https://strive.school/assets/strive_white.png' alt='Strive Logo' />
          </Link>
          <Container className='justify-content-end justify-content-lg-start'>
            <Navbar.Toggle aria-controls='navbarSupportedContent' />
            <Navbar.Collapse id='navbarSupportedContent' className='m'>
              {login ? (
                <>
                  <Nav className='mr-auto'>
                    <Link to='/main' className='text-decoration-none'>
                      <div className='nav-link active'>Home</div>
                    </Link>
                    <Link to='/dashboard' className='text-decoration-none'>
                      <div className='nav-link active'>Home</div>
                    </Link>
                  </Nav>
                  <Nav className='ml-auto'>
                    <Link to={"/"} className='text-decoration-none'>
                      <div className='nav-link btn-dark mr-3' onClick={logOut}>
                        Log Out
                      </div>
                    </Link>
                  </Nav>
                </>
              ) : (
                <Nav className='ml-auto'>
                  <Link to={"/signUp"} className='text-decoration-none'>
                    <div className='nav-link btn-dark mr-3'>Sign Up</div>
                  </Link>
                  <Link to={"/logIn"} className='text-decoration-none'>
                    <div className='nav-link btn-dark'>Log In</div>
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Container>
      </Navbar>
    </div>
  );
};

export default withRouter(NavBar);
