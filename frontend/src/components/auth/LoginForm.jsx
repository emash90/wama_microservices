import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = ({ loginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginUser = async () => {
    if (!user.email || !user.password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const response = await loginUser(user);

      if (response?.status !== 200) {
        toast.error(`Failed login: ${response?.data?.message}`);
      } else {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(`Login failed: ${error}`);
    }
  };

  return (
    <Form className="p-4 shadow rounded w-75 bg-white">
      <h3 className="text-center mb-4">Login</h3>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="button" className="w-100" onClick={handleLoginUser}>
        Login
      </Button>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p className="text-center mt-3">
        <Link to="/reset_password">forgot password</Link>
      </p>
    </Form>
  );
};

export default LoginForm;
