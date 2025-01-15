import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { addTenant } from '../../services/tenantServices';

const AddTenantModal = ({ show, onClose, vacantHouses, setTenants }) => {
    const [tenantData, setTenantData] = useState({
        tenant_first_name: '',
        tenant_last_name: '',
        tenant_email: '',
        tenant_phone: '',
        tenant_house_id: '',
        tenant_rent: 0,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setTenantData((prevData) => {
          const updatedData = { ...prevData, [name]: value };
    
          // If the house ID changes, update the tenant rent
          if (name === 'tenant_house_id') {
            const selectedHouse = vacantHouses.find((house) => house._id === value);
            updatedData.tenant_rent = selectedHouse ? selectedHouse.house_price : 0;
          }
          return updatedData;
        });
      };

      const handleAddTenant = async () => {
        try {
      
          const addedTenant = await addTenant(tenantData);
      
          if (addedTenant) {
            setTenants((prevTenants) => [addedTenant, ...prevTenants]);
            handleClearForm();
            onClose(); 
          }
        } catch (error) {
          console.error('Error adding tenant:', error);
        }
      };
      
        
    const handleClearForm = () => {
        setTenantData({
            tenant_first_name: '',
            tenant_last_name: '',
            tenant_email: '',
            tenant_phone: '',
            tenant_rent: 0,
            tenant_house_id: ''
        })
        onClose()
    }
  return (
    <>
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Tenant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="tenant_first_name"
                    value={tenantData.tenant_first_name}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="tenant_last_name"
                    value={tenantData.tenant_last_name}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="tenant_email"
                    value={tenantData.tenant_email}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="tenant_phone"
                    value={tenantData.tenant_phone}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>House Number</Form.Label>
                <Form.Control
                    as="select"
                    name="tenant_house_id"
                    value={tenantData.tenant_house_id}
                    onChange={handleInputChange}
                    >
                    <option value="">Select House</option>
                    {vacantHouses?.length > 0 ? (
                    vacantHouses.map((house) => (
                        <option key={house._id} value={house._id}>
                        {house.house_number}
                        </option>
                    ))
                    ) : (
                    <option value="" disabled>No vacant houses available</option>
                    )}
                </Form.Control>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddTenant}>
                Add Tenant
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default AddTenantModal
