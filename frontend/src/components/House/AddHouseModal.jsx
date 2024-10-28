import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addHouse } from '../../services/houseService';

const AddHouseModal = ({ show, onClose, setHouses }) => {
  const [houseData, setHouseData] = useState({
    house_number: '',
    house_location: '',
    house_price: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddHouse = async () => {
    const addedHouse = await addHouse(houseData);
    if (addedHouse) {
      setHouses((prevHouses) => [...prevHouses, addedHouse]);
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New House</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              name="house_number"
              value={houseData.house_number}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="house_location"
              value={houseData.house_location}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="house_price"
              value={houseData.house_price}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleAddHouse}>Add House</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddHouseModal;
