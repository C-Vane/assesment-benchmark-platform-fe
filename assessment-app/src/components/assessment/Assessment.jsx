import React, { useState } from "react";
import { Alert, Button, Col, Container, FormControl, FormGroup, FormLabel, Image, Row, Table } from "react-bootstrap";
import { getFunction, postFunction } from "../CRUDFunctions";

const Assessment = ({ user }) => {
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [time, setTime] = useState(0);
  const [next, setNext] = useState(false);
  const [results, setResults] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const getTest = async () => {
    const url = time < 1 ? "exam/start" : "exam/start?time=" + time;
    const newTest = await postFunction(url, { candidateID: user._id });
    if (newTest.questions) {
      console.log(newTest);
      setTest(newTest);
      setQuestions(newTest.questions);
      setTime(newTest.questions[0].duration * 10);
    } else {
      setErrMessage(newTest);
      setTimeout(() => {
        setErrMessage("");
      }, 2500);
    }
  };
  const getStatus = async () => {
    const newTest = await getFunction("exam/" + results._id);
    console.log(newTest);
    if (newTest._id) {
      setTest(newTest);
    } else {
      setErrMessage(newTest);
      setTimeout(() => {
        setErrMessage("");
      }, 2500);
    }
  };
  const startNext = () => {
    sendAnswer();
    setNext(false);
    setCurrent(current + 1);
    setTime(questions[current].duration * 10);
    startTimer();
  };
  const startTimer = () => {};

  const sendAnswer = async () => {
    const results = await postFunction(`exam/${test._id}/answers`, { question: current, answer: answer });
    console.log(results);
    if (results) {
      setResults(results);
      setCurrent(0);
      setTest(0);
      setQuestions([]);
      setAnswer(null);
      setNext(false);
      setTime(0);
    }
  };

  return (
    <div id='assesment'>
      {errMessage && (
        <Alert variant='danger' style={{ position: "absolute", top: "10vh", left: "0", right: "0" }}>
          Error: {errMessage}
        </Alert>
      )}
      {questions.length < 1 && !results ? (
        <Container>
          <Col className='d-flex flex-column'>
            <h1 className='big align-self-center mt-5'>Welcome</h1>
            <FormGroup className='w-50 align-self-center mt-5 d-flex'>
              <FormLabel className=' font-weight-bolder mr-4'>Test Duration in minutes</FormLabel>
              <FormControl type='number' className='w-50' value={time} min='0' max='60' onChange={(e) => setTime(e.target.value > 60 ? 60 : e.target.value)} />
            </FormGroup>
            <Button className='w-50 mt-4 rounded py-3' id='sign in' variant='success' onClick={getTest}>
              Start Test
            </Button>
          </Col>
        </Container>
      ) : (
        <Container>
          {questions.length > 0 ? (
            <>
              <Row className='justify-content-between'>
                <small>
                  {current + 1}/{questions.length} Test
                </small>
                <Row>
                  <p>Duration: {questions[current].duration} sec</p>
                  <h1>Question {current + 1}</h1>
                  <p>{questions[current].text}</p>
                  {questions[current].answers.map((answer, i) => (
                    <Col key={i} md={6}>
                      <Image src='http://strive.school/assets/images/flag.png' style={{ transform: "rotate(-90deg)" }} height='30' width='30' />
                      <Button
                        variant='light'
                        className=' w-75 p-2 rounded-0 mx-auto my-2'
                        onClick={() => {
                          setAnswer(i);
                          /*  if (questions[current].correctAnswer == 1) {} else {
                            setAnswer([answer, i]);
                          } */
                          setNext(true);
                        }}
                      >
                        {answer.text}
                      </Button>
                    </Col>
                  ))}
                </Row>
                <p>Correct Answers:{questions[current].correctAnswer}</p>
              </Row>
              {next && (
                <Row>
                  <Button
                    className='mt-4 mr-5 rounded py-1'
                    id='sign in'
                    variant='success'
                    onClick={() => {
                      current === questions.length - 1 ? sendAnswer() : startNext();
                    }}
                  >
                    {current === questions.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Row>
              )}
            </>
          ) : (
            <Row>
              <Container>
                <Col className='d-flex flex-column'>
                  <h1 className='big align-self-center mt-5'>Assessment Results</h1>
                  <h2>Result: {results.result}%</h2>
                  {results.result >= 60 ? (
                    <div>
                      <p className='text-success font-weight-bold'>Congradulations you have passed</p>
                      <Row className='justify-content-between mt-5 w-50'>
                        <Button variant='outline-success' onClick={() => setResults(false)}>
                          Try Again
                        </Button>
                        <Button variant='outline-success' onClick={getStatus}>
                          Details
                        </Button>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <p className='text-warning font-weight-bold'>Sorry! You have not passed please try again</p>
                      <Row className='justify-content-between mt-5 w-50'>
                        <Button variant='outline-success' onClick={() => setResults(false)}>
                          Try Again
                        </Button>
                        <Button variant='outline-success' onClick={getStatus}>
                          Details
                        </Button>
                      </Row>
                    </div>
                  )}
                </Col>
              </Container>
            </Row>
          )}
        </Container>
      )}

      {test.isCompleted && results && (
        <Container className='mt-3'>
          <h3 className='text-white mb-3'>Test Details</h3>
          <Row>
            <Col>
              <h5>Candidate detail</h5>
              <p className='m-0'>Name: {test.name}</p>
              <p className='m-0'>ID: {test.candidateId}</p>
              <p className='m-0'>Test Completed</p>
            </Col>
            <Col>
              <h5>Assesment detail</h5>
              <p className='m-0'>Passed: {test.result >= 60 ? "YES" : "NO"}</p>
              <p className='m-0'>Exam_ID: {test._id}</p>
              <p className='m-0'>Result: {test.result}</p>
              <p className='m-0'>Duration: {test.totalDuration} min</p>
            </Col>
          </Row>
          <Table striped bordered hover size='sm' variant='dark' className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {test.questions.map((question, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{question.text}</td>
                  <td>{question.answers[0].text}</td>
                  <td>{question.answers[0].isCorrect ? <p className='text-success font-weight-bold'>Correct</p> : <p className='text-danger font-weight-bold'>Incorrect</p>}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};
export default Assessment;
