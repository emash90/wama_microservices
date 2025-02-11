import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthNavbar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="p-4 w-100 fixed-top">
      <Container>
        <Nav className="ms-auto">
          <Button variant="outline-primary" className="me-2" as={Link} to="/login">
            Login
          </Button>
          <Button variant="primary" as={Link} to="/register">
            Register
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AuthNavbar;
