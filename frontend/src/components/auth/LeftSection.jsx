import React from 'react';

const LeftSection = ({ title, description }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-light"
      style={{
        textAlign: 'center',
        padding: '2rem',
        height: '100%',
      }}
    >
      <h1>{title}</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{description}</p>
    </div>
  );
};

export default LeftSection;
