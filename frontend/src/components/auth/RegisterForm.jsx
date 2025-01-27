import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterForm = ({ registerUser }) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password) {
      toast.error('Please fill all fields!');
      return;
    }

    try {
      const resp = await registerUser(newUser);
      if (resp?.status === 201) {
        toast.success('Registration successful');
        localStorage.setItem('authToken', resp.data.token);
        navigate('/dashboard');
      } else {
        toast.error(`Failed: ${resp?.data?.message || 'Something went wrong!'}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form className="p-4 shadow rounded w-75 bg-white">
      <h3 className="text-center mb-4">Register</h3>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="button" className="w-100" onClick={handleRegister}>
        Register
      </Button>

      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
