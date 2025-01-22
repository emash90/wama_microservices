import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { addTenant } from '../../services/tenantServices';
import {toast} from 'react-toastify'

const AddTenantModal = ({ show, onClose, vacantHouses, setTenants }) => {
  const [tenantData, setTenantData] = useState({
    tenant_first_name: '',
    tenant_last_name: '',
    tenant_email: '',
    tenant_phone: '',
    tenant_house_id: '',
    tenant_rent: 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!tenantData.tenant_first_name.trim()) newErrors.tenant_first_name = 'First name is required.';
    if (!tenantData.tenant_last_name.trim()) newErrors.tenant_last_name = 'Last name is required.';
    if (!tenantData.tenant_email.trim()) {
      newErrors.tenant_email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(tenantData.tenant_email)) {
      newErrors.tenant_email = 'Invalid email format.';
    }
    if (!tenantData.tenant_phone.trim()) {
      newErrors.tenant_phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(tenantData.tenant_phone)) {
      newErrors.tenant_phone = 'Phone number must be 10 digits.';
    }
    if (!tenantData.tenant_house_id.trim()) newErrors.tenant_house_id = 'House number is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTenantData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'tenant_house_id') {
        const selectedHouse = vacantHouses.find((house) => house._id === value);
        updatedData.tenant_rent = selectedHouse ? selectedHouse.house_price : 0;
      }
      return updatedData;
    });
  };

  const handleAddTenant = async () => {
    if (!validateForm()) return;

    try {
      const response = await addTenant(tenantData);

      if (response.status != 201) {
        toast.error(response.data.message)
      }else {
        setTenants((prevTenants) => [response.data, ...prevTenants]);
        handleClearForm();
        onClose();
        toast.success("tenant added successfully")
      }
    } catch (error) {
      console.error('Error adding tenant:', error);
      toast.error(error)
    }
  };

  const handleClearForm = () => {
    setTenantData({
      tenant_first_name: '',
      tenant_last_name: '',
      tenant_email: '',
      tenant_phone: '',
      tenant_house_id: '',
      tenant_rent: 0,
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="tenant_first_name"
                value={tenantData.tenant_first_name}
                onChange={handleInputChange}
                isInvalid={!!errors.tenant_first_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tenant_first_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="tenant_last_name"
                value={tenantData.tenant_last_name}
                onChange={handleInputChange}
                isInvalid={!!errors.tenant_last_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tenant_last_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="tenant_email"
                value={tenantData.tenant_email}
                onChange={handleInputChange}
                isInvalid={!!errors.tenant_email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tenant_email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="tenant_phone"
                value={tenantData.tenant_phone}
                onChange={handleInputChange}
                isInvalid={!!errors.tenant_phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tenant_phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>House Number</Form.Label>
              <Form.Control
                as="select"
                name="tenant_house_id"
                value={tenantData.tenant_house_id}
                onChange={handleInputChange}
                isInvalid={!!errors.tenant_house_id}
              >
                <option value="">Select House</option>
                {vacantHouses?.length > 0 ? (
                  vacantHouses.map((house) => (
                    <option key={house._id} value={house._id}>
                      {house.house_number}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No vacant houses available
                  </option>
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.tenant_house_id}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClearForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTenant}>
            Add Tenant
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTenantModal;
