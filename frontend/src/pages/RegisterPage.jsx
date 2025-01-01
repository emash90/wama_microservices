import React, { useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleRegister = async () => {
    console.log("new user", newUser)
    const resp = await registerUser(newUser)
    console.log("new user register", resp)
  }

  return (
    <div>
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
              <Col md={{ span: 6, offset: 3 }}>
                <Form className="p-4 shadow rounded bg-light">
                  <h3 className="text-center mb-4">Register</h3>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" name='first_name' value={newUser.first_name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your last name" name='last_name' value={newUser.last_name}  onChange={handleInputChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" name='email' value={newUser.email} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" name='password' value={newUser.password} onChange={handleInputChange} />
                  </Form.Group>
      
                  <Button variant="primary" type="button" className="w-100" onClick={handleRegister} >
                    Register
                  </Button>
                  <p style={{paddingTop: '15px'}}>Already have an account? <span><Link to={'/login'}> Login</Link></span></p>
                </Form>
              </Col>
            </Row>
          </Container>
    </div>
  )
}

export default RegisterPage
