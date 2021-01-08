import React, { useState } from 'react';
import { Container, Form, Row, Spinner, Col, Button, Modal, Image, Nav, Table, Alert } from 'react-bootstrap';

const SignUp = () => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [yearOfBirth, setYearOfBirth] = useState(0)
    const [street, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [errors, setErroes] = useState({
        name: 0,
        surname: 0,
        email: 0,
        password: 0,
        passwordConfirm: 0,
        yearOfBirth: 0,
        street: 0,
        country: 0,
        city: 0,
        postalCode: 0,
    })
    const [incorrect, setIncorrect] = useState(true)
    const [loading, setLoading] = useState(false)
    const checkForm = () => { }
    const updateForm = () => { }
    const validateForm = () => { }
    return <Container>

        <Row id="signUp">
            <h2>Sign Up</h2>

            <Container>
                <Form onSubmit={checkForm} className="register">

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <small className={errMessage ? "text-danger" : "d-none"} > {errMessage}</small>
                                    <Form.Group>
                                        <Form.Label htmlFor="name">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.name ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.name ? "text-danger" : "d-none"} >Name should be longer than 2 chars</small>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="surname">Surname</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            autoComplete="family-name"
                                            placeholder="Your surname"
                                            value={surname}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.surname ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.surname ? "text-danger" : "d-none"} >Surname should be longer than 3 chars</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={9}>
                                    <Form.Group>
                                        <Form.Label htmlFor="email">Your email street</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            placeholder="example@example.com"
                                            value={email}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.email ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.email ? "text-danger" : "d-none"} >Email should include @ . and be longer than 4 chars</small>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="yearOfBirth">Year of Birth</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="yearOfBirth"
                                            id="yearOfBirth"
                                            autoComplete="bday-year"
                                            value={yearOfBirth}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            placeholder="YYYY"
                                            className={errors.yearOfBirth ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.yearOfBirth ? "text-danger" : "d-none"} >Year of Birth should be before 2002 and after 1910</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="street">Street street</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="street"
                                            id="street"
                                            placeholder="Your street"
                                            value={street}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.street ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.street ? "text-danger" : "d-none"} >Street should be longer than 5 chars</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="city">City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            id="city"
                                            placeholder="Your city"
                                            value={city}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.city ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.city ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postalCode"
                                            id="postalCode"
                                            placeholder="00000"
                                            value={postalCode}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.postalCode ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.postalCode ? "text-danger" : "d-none"} >Postal Code should be a 5 digit number and should't include chars</small>                                 </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="country">Country</Form.Label>
                                        <Form.Control
                                            minLength="3"
                                            name="country"
                                            id="country"
                                            placeholder="Your country"
                                            value={country}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.country ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.country ? "text-danger" : "d-none"} >Country should be longer then 3 letters</small>                                 </Form.Group>
                                </Col>

                            </Row>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label htmlFor="password">Your password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            placeholder=""
                                            value={password}
                                            onChange={updateForm}
                                            onBlur={validateForm}
                                            className={errors.password ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.password ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="passwordConfirm">Confirm Your password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="passwordConfirm"
                                            autoComplete="new-password"
                                            id="passwordConfirm"
                                            placeholder=""
                                            onBlur={validateForm}
                                            className={errors.passwordConfirm ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.passwordConfirm ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                                    </Col>
                                </Row>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Button type="submit" id="sign in" variant="danger" disabled={incorrect}>Sign up</Button>
                </Form>
            </Container>
        </Row>
    </Container>;
}

export default SignUp;