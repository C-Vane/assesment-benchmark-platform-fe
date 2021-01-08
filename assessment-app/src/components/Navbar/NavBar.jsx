import React from "react";
import { Navbar, ButtonGroup, Image, Nav, Dropdown, Button, Container, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./navBar.css";
const NavBar = ({ location, user, logOut }) => {

    if (location.pathname === "/logIn" || location.pathname === "/signUp" || location.pathname === "/assessment" || location.pathname === "/office") {
        return <Link to='/'>
            <Image style={{ height: "45px" }} src='https://strive.school/assets/strive_white.png' alt='Strive Logo' />
        </Link>;
    }
    return (
        <div id='navBar'>
            <Navbar bg="dark" className='navbar mb-0' expand='lg'>

                <Link to='/'>
                    <Image style={{ height: "35px" }} src='https://strive.school/assets/strive_white.png' alt='Strive Logo' />
                </Link>
                <Container className='justify-content-end justify-content-lg-start'>
                    <Navbar.Toggle aria-controls='navbarSupportedContent' />
                    <Navbar.Collapse id='navbarSupportedContent' className='m'>
                        <Nav className='mr-auto'>
                            <Link to={user.name ? "/main" : "/"} className='text-decoration-none'>
                                <div className={location.pathname === "/" || "/main" ? "nav-link active" : "nav-link"}>Home</div>
                            </Link>
                        </Nav>
                        <Nav className='ml-auto'>
                            <Link to={"/signUp"} className='text-decoration-none'>
                                <div className="nav-link btn-dark mr-3">Sign Up</div>
                            </Link>
                            <Link to={"/logIn"} className='text-decoration-none'>
                                <div className="nav-link btn-dark">Log In</div>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default withRouter(NavBar);