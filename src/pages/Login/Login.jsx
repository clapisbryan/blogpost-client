import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import UserContext from '../../hooks/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { login, userDetails } from '../../services/userApiServices';
const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password
    }

    const response = await login(payload);
    if (!response) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Email and password do not match."
      })
    }

    if (response) {
      localStorage.setItem('token', response.access);
      setEmail('');
      setPassword('');

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        text: "You are now logged in."
      });
      navigate('/')

    } else if (response.message == "Email and password do not match") {

      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Email and password do not match."
      })

    } else {

      Swal.fire({
        title: "User Not Found",
        icon: "error",
        text: `${email} does not exist.`
      })
    }

  }

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

  }, [email, password]);

  return (
    <>
      <Container>
        <Row className='align-items-center justify-content-center my-5'>
          <Col sm={12} md={5}>
            <Card>
              <CardBody>
                <Form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <h1 className='text-center'>Login</h1>
                  </div>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <div className="text-center">
                    {
                      isActive ? <Button variant="primary" type="submit" size='md'>
                        Login
                      </Button> :
                        <Button variant="secondary" type="submit" size='md' disabled>
                          Login
                        </Button>
                    }
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
