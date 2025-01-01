import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { updateHouse } from '../../services/houseService';

const EditHouseModal = ({ house, onClose, show, setHouses }) => {
    if (!house) return null;

    const [newHouseDetails, setNewHouseDetails] = useState({
        house_number: house.house_number,
        house_location: house.house_location,
        house_price: house.house_price,
        house_type: house.house_type,
        occupied: house.occupied
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHouseDetails((prevData) => ({
            ...prevData,
            [name]: typeof prevData[name] === 'boolean' ? !prevData[name] : value,
        }));
    };

    const handleEditHouse = async() => {
        const response = await updateHouse(house._id, newHouseDetails);
        if (response) {
            setHouses((prevHouses) => {
                const newHouses = prevHouses.map((h) => {
                    if (h._id === house._id) {
                        return response;
                    }
                    return h;
                });
                return newHouses;
            });
        }

        onClose();
    }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit House</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              name="house_number"
              value={newHouseDetails.house_number}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="house_location"
              value={newHouseDetails.house_location}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="house_price"
              value={newHouseDetails.house_price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>House Type</Form.Label>
            <Form.Control
              type="text"
              name="house_type"
              value={newHouseDetails.house_type}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Occupied"
              name="occupied"
              checked={newHouseDetails.occupied}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditHouse}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditHouseModal
