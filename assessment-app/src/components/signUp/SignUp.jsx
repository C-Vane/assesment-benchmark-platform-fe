import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Row, Spinner, Col, Button, Modal, Image, Nav, Table, Alert } from 'react-bootstrap';
import { postFunction } from '../CRUDFunctions';
import { checkEmail, checkPassword, checkPostalCode } from '../validationUntilites';
const SignUp = ({ getId }) => {
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
    const [errors, setErrors] = useState({
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
    const checkForm = (e) => {
        e.preventDefault()
        createUser()
    }
    const validateForm = (e) => {
        let currentId = e.currentTarget.id
        let err = { ...errors }
        let current = e.currentTarget.value
        switch (currentId) {
            case 'name':
                err[currentId] = name.length <= 2 ? true : false;
                break;
            case 'surname':
                err[currentId] = surname.length <= 3 ? true : false;
                break;

            case 'email':
                err[currentId] = checkEmail(email) ? false : true;
                break;
            case 'password':
                err[currentId] = checkPassword(password) ? false : true;
                break;
            case 'passwordConfirm':
                Object.keys(err).forEach((key) => {
                    switch (key) {
                        case 'name':
                            err[key] = name.length <= 2 ? true : false;
                            break;
                        case 'surname':
                            err[key] = surname.length <= 3 ? true : false;
                            break;
                        case 'email':
                            err[key] = checkEmail(email) ? false : true;
                            break;
                        case 'yearOfBirth':
                            err[key] = yearOfBirth <= 2002 && yearOfBirth >= 1910 ? false : true;
                            break;
                        case 'street':
                            err[key] = street.length <= 5 ? true : false;
                            break;
                        case 'city':
                            err[key] = city.length <= 2 ? true : false;
                            break;
                        case 'country':
                            err[key] = country.length <= 2 ? true : false;
                            break;
                        case 'postalCode':
                            err[key] = checkPostalCode(postalCode) ? false : true;
                            break;
                        case 'passwordConfirm':
                            err[currentId] = current === password ? false : true;
                            break;
                        case 'password':
                            err[currentId] = checkPassword(password) ? false : true;
                            break;
                        default:
                            console.log("Error occurd in Validation")
                            setErrMessage("Error in Validation")
                            break;
                    }
                })
                break;
            case 'yearOfBirth':
                err[currentId] = yearOfBirth <= 2002 && yearOfBirth >= 1910 ? false : true;
                break;
            case 'street':
                err[currentId] = street.length <= 5 ? true : false;
                break;
            case 'city':
                err[currentId] = city.length <= 2 ? true : false;
                break;
            case 'country':
                err[currentId] = country.length <= 2 ? true : false;
                break;
            case 'postalCode':
                err[currentId] = checkPostalCode(postalCode) ? false : true;
                break;
            default:
                console.log("Error occurd in Validation")
                setErrMessage("Error in Validation")
                break;
        }
        setErrors(err)
        Object.values(err).every((el) => el === false) && setIncorrect(false) && setErrMessage("")
    }
    const createUser = async () => {
        const form = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            yearOfBirth: yearOfBirth,
            street: street,
            city: city,
            country: country,
            postalCode: postalCode
        }
        const candidate = await postFunction("candidates", form)
        if (candidate) {
            getId(candidate._id)
            setRedirect(true)
        } else {
            setErrMessage(typeof (candidate) === "object" ? candidate.errors[0].msg : "Email already Used")
            setTimeout(() => {
                setErrMessage("")
            }, 2000);
        }
    }
    if (redirect) {
        return <Redirect to="/main" />
    }
    return <Container>

        <Row id="signUp">
            <h2>Sign Up</h2>

            <Container>
                <Form onSubmit={checkForm}>

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
                                            onChange={(e) => setName(e.currentTarget.value)}
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
                                            onChange={(e) => setSurname(e.currentTarget.value)}
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
                                        <Form.Label htmlFor="email">Your email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            placeholder="example@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
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
                                            onChange={(e) => setYearOfBirth(e.currentTarget.value)}
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
                                <Col md={8}>
                                    <Form.Group>
                                        <Form.Label htmlFor="street">Street Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="street"
                                            id="street"
                                            placeholder="Your street"
                                            value={street}
                                            onChange={(e) => setAddress(e.currentTarget.value)}
                                            onBlur={validateForm}
                                            className={errors.street ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.street ? "text-danger" : "d-none"} >Street should be longer than 5 chars</small>                                 </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postalCode"
                                            id="postalCode"
                                            placeholder="00000"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.currentTarget.value)}
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
                                        <Form.Label htmlFor="city">City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            id="city"
                                            placeholder="Your city"
                                            value={city}
                                            onChange={(e) => setCity(e.currentTarget.value)}
                                            onBlur={validateForm}
                                            className={errors.city ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.city ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>                                 </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="country">Country</Form.Label>
                                        <Form.Control
                                            minLength="3"
                                            name="country"
                                            id="country"
                                            autoComplete="country"
                                            placeholder="Your country"
                                            value={country}
                                            onChange={(e) => setCountry(e.currentTarget.value)}
                                            onBlur={validateForm}
                                            className={errors.country ? "error" : ""}
                                            required
                                        />

                                        <small className={errors.country ? "text-danger" : "d-none"} >Country should be longer then 3 letters</small>                                 </Form.Group>
                                </Col>

                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="password">Your password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            placeholder="New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.currentTarget.value)}
                                            onBlur={validateForm}
                                            className={errors.password ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.password ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="passwordConfirm">Confirm Your password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="passwordConfirm"
                                            autoComplete="new-password"
                                            id="passwordConfirm"
                                            placeholder="Re-enter password"
                                            onBlur={validateForm}
                                            className={errors.passwordConfirm ? "error" : ""}
                                            required
                                        />
                                        <small className={errors.passwordConfirm ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </Col>
                    </Row>
                    <Row>
                        <Button className="w-50" type="submit" id="sign in" variant="success" disabled={incorrect}>Sign up</Button>
                    </Row>
                </Form>
            </Container>
        </Row>
    </Container>;
}

export default SignUp;