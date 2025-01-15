import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { updateHouse } from '../../services/houseService';

const EditTenantModal = ({ tenant, onClose, show, setTenants }) => {
    if (!tenant) return null;

    const [newTenantDetails, setNewTenantDetails] = useState({
        tenant_first_name: tenant.tenant_first_name,
        tenant_last_name: tenant.tenant_last_name,
        tenant_phone: tenant.tenant_phone,
        house_email: tenant.tenant_email,
        // occupied: tenant.occupied
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTenantDetails((prevData) => ({
            ...prevData,
        }));
    };

    const handleEditTenant = async() => {
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
        <Modal.Title>Edit Tenant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="tenant_first_name"
              value={newTenantDetails.tenant_first_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="tenant_last_name"
              value={newTenantDetails.tenant_last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="tenant_phone"
              value={newTenantDetails.tenant_phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditTenant}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTenantModal
