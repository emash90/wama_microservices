import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { updateHouse } from '../../services/houseService';
import { updatePayment } from '../../services/paymentService';

const EditPaymentModal = ({ selectedPayment, setPayments, onClose, show }) => {
    if (!selectedPayment) return null;

    const [newPaymentDetails, setNewPaymentsDetails] = useState({
        month: selectedPayment.month,
        amount_paid: selectedPayment.amount_paid,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPaymentsDetails((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleEditPayment = async() => {
        const response = await updatePayment(selectedPayment._id, newPaymentDetails);
        if (response) {
            setPayments((prevPayments) => {
                const newPayments = prevPayments.map((p) => {
                    if (p._id === selectedPayment._id) {
                        return response;
                    }
                    return p;
                });
                return newPayments;
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
            <Form.Label>Payment for Month</Form.Label>
                <Form.Control
                    as="select"
                    name="month"
                    value={newPaymentDetails.month}
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
          <Form.Group>
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              name="amount_paid"
              value={newPaymentDetails.amount_paid}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditPayment}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPaymentModal
