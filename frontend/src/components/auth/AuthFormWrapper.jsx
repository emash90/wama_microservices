import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AuthNavbar from './AuthNavBar';

const AuthFormWrapper = ({ children }) => {
  return (
    <div style={{ height: '100vh', padding: 0 }}>
      <Container fluid className="w-100 h-100">
        <Row className="m-0 h-100">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#004085',
              height: '100vh',
            }}
          >
            <div className="text-center text-light">
              {children.left}
            </div>
          </Col>

          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-start"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #f7f7f7)',
              height: '100vh',
              marginTop: '50px'
            }}
          >
            <AuthNavbar />
            <div className="d-flex justify-content-center align-items-center w-100 mt-5">
              {children.right}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthFormWrapper;
