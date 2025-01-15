import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addHouse } from '../../services/houseService';

const AddHouseModal = ({ show, onClose, setHouses }) => {
  const [houseData, setHouseData] = useState({
    house_number: '',
    house_location: '',
    house_price: '',
    house_type: '',
    occupied: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddHouse = async () => {
    houseData.house_type = parseInt(houseData.house_type, 10);
    const addedHouse = await addHouse(houseData);
    if (addedHouse) {
      setHouses((prevHouses) => [addedHouse, ...prevHouses]);
    }
    handleClearForm();
  };

  const handleClearForm = () => {
    setHouseData({
      house_number: '',
      house_location: '',
      house_price: '',
      house_type: '',
      occupied: false,
    });
    onClose();
  }

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
              as="select"
              name="house_location"
              value={houseData.house_location}
              onChange={handleInputChange}
            >
              <option value="">Select Location</option>
              <option value="main area">Main Area</option>
              <option value="stage area">Stage Area</option>
              <option value="behind county offices">Behind County Offices</option>
              <option value="next to county hospital">Next to County Hospital</option>
            </Form.Control>
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
          <Form.Group>
            <Form.Label>House Type</Form.Label>
            <Form.Control
              as="select"
              name="house_type"
              value={houseData.house_type}
              onChange={handleInputChange}
            >
              <option value="">Select House Type</option>
              <option value="1">Residential</option>
              <option value="2">Commercial</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Occupied"
              name="occupied"
              checked={houseData.occupied}
              onChange={(e) => setHouseData((prevData) => ({
                ...prevData,
                occupied: e.target.checked,
              }))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClearForm}>Close</Button>
        <Button variant="primary" onClick={handleAddHouse}>Add House</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddHouseModal;
