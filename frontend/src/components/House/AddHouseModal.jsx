import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addHouse } from '../../services/houseService';
import { toast } from 'react-toastify';


const AddHouseModal = ({ show, onClose, setHouses }) => {
  const [houseData, setHouseData] = useState({
    house_number: '',
    house_location: '',
    house_price: '',
    house_type: '',
    occupied: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!houseData.house_number) newErrors.house_number = 'House number is required.';
    if (!houseData.house_location) newErrors.house_location = 'Location is required.';
    if (!houseData.house_price) newErrors.house_price = 'Price is required.';
    if (!houseData.house_type) newErrors.house_type = 'House type is required.';
    return newErrors;
  };

  const handleAddHouse = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    houseData.house_type = parseInt(houseData.house_type, 10);
    const response = await addHouse(houseData);
    console.log("response", response)
    if (response.status != 201) {
      toast.error(response.data.message)
    }else {
      const newHouse = response.data
      setHouses((prevHouses) => [newHouse, ...prevHouses]);
      handleClearForm();
      toast.success("house added successfully")
    }
  };

  const handleClearForm = () => {
    setHouseData({
      house_number: '',
      house_location: '',
      house_price: '',
      house_type: '',
      occupied: false,
    });
    setErrors({});
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
              isInvalid={!!errors.house_number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.house_number}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="select"
              name="house_location"
              value={houseData.house_location}
              onChange={handleInputChange}
              isInvalid={!!errors.house_location}
            >
              <option value="">Select Location</option>
              <option value="main area">Main Area</option>
              <option value="stage area">Stage Area</option>
              <option value="behind county offices">Behind County Offices</option>
              <option value="next to county hospital">Next to County Hospital</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.house_location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="house_price"
              value={houseData.house_price}
              onChange={handleInputChange}
              isInvalid={!!errors.house_price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.house_price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>House Type</Form.Label>
            <Form.Control
              as="select"
              name="house_type"
              value={houseData.house_type}
              onChange={handleInputChange}
              isInvalid={!!errors.house_type}
            >
              <option value="">Select House Type</option>
              <option value="1">Residential</option>
              <option value="2">Commercial</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.house_type}
            </Form.Control.Feedback>
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
