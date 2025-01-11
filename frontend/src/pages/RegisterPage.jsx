import React, { useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';


const RegisterPage = () => {
  const navigate = useNavigate()
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
    if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password) {
      toast.error('please fill all fields!')
      return
    } 
    try {
      const resp = await registerUser(newUser)
      console.log("new user register", resp)
      if (resp && resp.status === 201) {
        toast.success('Registration successful')
        localStorage.setItem("authToken", resp.data.token)
        localStorage.setItem('user', JSON.stringify(resp.data));
        navigate('/dashboard')
      }else {
        const message = resp?.data?.message || "Something went wrong!";
        console.log("error response", message)
        toast.error(`Failed: ${message}`)
      }
    } catch (error) {
      toast.error(error)
    }
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
