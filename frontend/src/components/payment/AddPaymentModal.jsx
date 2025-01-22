import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchTenantById, fetchTenants } from '../../services/tenantServices'
import { addPayment } from '../../services/paymentService';
import { fetchHouseById } from '../../services/houseService';

const AddPaymentModal = ({ show, onClose, setPayments }) => {
  const [tenants, setTenants] = useState([]);
  const [paymentData, setPaymentData] = useState({
    tenant_id: '',
    house_id: '',
    tenant_house_number: '',
    amount_due: '',
    amount_paid: '',
    balance: '',
    date_paid: '',
    payment_mode: '',
    full_payment: false,
    month: ''
  });

  useEffect(() => {
    const fetchAllTenants = async () => {
      const tenantList = await fetchTenants();
      const activeTenants = tenantList.filter((tenant) => tenant.active)
      setTenants(activeTenants);
    };
    fetchAllTenants();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTenantChange = async (e) => {
    const tenantId = e.target.value;
    setPaymentData((prevData) => ({ ...prevData, tenant_id: tenantId }));

    if (tenantId) {
      const tenantHouseId = await fetchTenantById(tenantId)
      if (tenantHouseId) {
        const house = await fetchHouseById(tenantHouseId[0].house_id)
        setPaymentData((prevData) => ({
          ...prevData,
          house_id: house._id,
          tenant_house_number: house.house_number,
          amount_due: house.house_price,
          amount_paid: '',
          balance: '',
          full_payment: false,
        }));
      }
    }
  };

  const handleFullPaymentChange = (e) => {
    const isFullPayment = e.target.checked;
    setPaymentData((prevData) => ({
      ...prevData,
      full_payment: isFullPayment,
      amount_paid: isFullPayment ? prevData.amount_due : '',
      balance: isFullPayment ? '0' : prevData.amount_due,
    }));
  };

  const handleAmountPaidChange = (e) => {
    const amountPaid = parseFloat(e.target.value) || 0;
    const balance = parseFloat(paymentData.amount_due) - amountPaid;
    setPaymentData((prevData) => ({
      ...prevData,
      amount_paid: e.target.value,
      balance: balance > 0 ? balance.toString() : '0',
    }));
  };

  const handleAddPayment = async () => {
    const addedPayment = await addPayment(paymentData);
    if (addedPayment) {
      setPayments((prevPayments) => [...prevPayments, addedPayment[0]]);
    }
    handleClearForm();
  };

  const handleClearForm = () => {
    setPaymentData({
      tenant_id: '',
      house_id: '',
      tenant_house_number: '',
      amount_due: '',
      amount_paid: '',
      balance: '',
      date_paid: '',
      payment_mode: '',
      full_payment: false,
      month: ''
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              as="select"
              name="tenant_id"
              value={paymentData.tenant_id}
              onChange={handleTenantChange}
            >
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant._id} value={tenant._id}>
                  {`${tenant.tenant_first_name} (${tenant.tenant_phone})`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tenant House Number</Form.Label>
            <Form.Control
              type="text"
              name="tenant_house_number"
              value={paymentData.tenant_house_number}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount Due</Form.Label>
            <Form.Control
              type="text"
              name="amount_due"
              value={paymentData.amount_due}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Full Payment"
              name="full_payment"
              checked={paymentData.full_payment}
              onChange={handleFullPaymentChange}
            />
          </Form.Group>
          {!paymentData.full_payment && (
            <>
              <Form.Group>
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control
                  type="number"
                  name="amount_paid"
                  value={paymentData.amount_paid}
                  onChange={handleAmountPaidChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="text"
                  name="balance"
                  value={paymentData.balance}
                  readOnly
                />
              </Form.Group>
            </>
          )}
          <Form.Group>
            <Form.Label>Date Paid</Form.Label>
            <Form.Control
              type="date"
              name="date_paid"
              value={paymentData.date_paid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Payment Mode</Form.Label>
            <Form.Control
              as="select"
              name="payment_mode"
              value={paymentData.payment_mode}
              onChange={handleInputChange}
            >
              <option value="">Select Payment Mode</option>
              <option value="Mpesa">Mpesa</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Payment for Month</Form.Label>
            <Form.Control
                as="select"
                name="month"
                value={paymentData.month}
                onChange={handleInputChange}
            >
                <option value="">Select a month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </Form.Control>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClearForm}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddPayment}>
          Add Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPaymentModal;
