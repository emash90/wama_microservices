import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserById, loginUser } from '../services/authService';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleLoginUser = async () => {
    
    // Validate the user email
    if (!user.email || user.email === '') {
      toast.error('email and password required')
      return; // Prevent further execution if email is missing
    }
    
    try {
      // Attempt to login
      const response = await loginUser(user);
      
      if (response.status !== 200) {
        // Handle unsuccessful login
        toast.error(`Failed login: ${response.data.message}`)
      } else {
        // Successful login, store token in localStorage
        
        // Ensure the response contains a token
        if (response.data && response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          // console.log('Token saved to localStorage');
          toast.success('login successful!');
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          console.error("No token received in response");
        }
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error(`Login failed: ${error}`)
      console.error("Error during login:", error);
    }
  };  

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="p-4 shadow rounded bg-light">
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name='email' value={user.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name='password' value={user.password} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="button" className="w-100" onClick={handleLoginUser} >
              Login
            </Button>
            <p style={{paddingTop: '15px'}}>Don't have an account? <span><Link to={'/register'}> Register</Link></span></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
