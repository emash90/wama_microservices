import React, { useState } from 'react';
import {
  CDBContainer,
  CDBRow,
  CDBCol,
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBBtn,
} from 'cdbreact';
import AddPaymentModal from './AddPaymentModal';
import EditPaymentModal from './EditPaymentModal';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { updatePayment } from '../../services/paymentService';
import { toast } from 'react-toastify';





const PaymentList = ({ payments, setPayments }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState()
  const navigate = useNavigate()

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const [showEditModal, setShowEditModal] = useState(false);
  

  const handleMenuOpen = (event, payment) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayment(payment);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPayment(null);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    navigate(`/payment/${selectedPayment._id}`);
    handleMenuClose();
  };

  const handleEdit = () => {
    setShowEditModal(true);  
    handleMenuClose(); 
  };

  const handlePaymentConfirm = async() => {
    // TODO: Implement payment confirmation
    try {
      // Prepare the updated tenant object with active set to false
      const updatedPayment = {
        ...selectedPayment,
        status: "confirmed",
      };
  
      // Call the updateTenant API with the selected tenant's ID and updated data
      const response = await updatePayment(selectedPayment.id, updatedPayment);
  
      if (response) {
        toast.success("payment confirmed successfully");
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === selectedPayment._id ? { ...payment, status: 'confirmed' } : payment
          )
        );

      } else {
        console.error("Failed to update payment");
        toast.error("Failed to update payment");
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Error updating payment");
    } finally {
      handleMenuClose();
    }
  };

  // Prepare data for CDBDataTable
  const tableData = {
    columns: [
      { label: '#', field: 'index', sort: 'asc' },
      { label: 'Tenant First Name', field: 'tenant_first_name', sort: 'asc' },
      { label: 'Tenant Last Name', field: 'tenant_last_name', sort: 'asc' },
      { label: 'House', field: 'house_number', sort: 'asc' },
      { label: 'Amount Paid', field: 'amount_paid', sort: 'asc' },
      { label: 'Date', field: 'date_paid', sort: 'asc' },
      { label: 'Payment For', field: 'payment_for', sort: 'asc' },
      { label: 'Status', field: 'status', sort: 'asc' },
      { label: 'Actions', field: 'actions', width: 150 }

    ],
    rows: payments?.map((payment, index) => ({
      index: index + 1,
      tenant_first_name: payment.tenantDetails.tenant_first_name || 'Unknown Tenant',
      tenant_last_name: payment.tenantDetails.tenant_last_name || 'Unknown Tenant',
      house_number: payment.houseDetails.house_number || 'Unknown House',
      amount_paid: payment.amount_paid || 0,
      date_paid: new Date(payment.date_paid).toLocaleDateString(),
      payment_for: payment.month,
      status: payment.status || 'Pending',
      actions: (
        <MoreVertIcon
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(e) => handleMenuOpen(e, payment)}
        />
      ),
    })),
  };

  return (
    <>
      <CDBContainer style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <CDBRow className="mb-4">
          <CDBCol>
            <h2>Payment List</h2>
          </CDBCol>
          <CDBCol className="text-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CDBBtn color="primary" onClick={handleShowAddModal}>
              Add Payment
            </CDBBtn>
          </CDBCol>
        </CDBRow>

        <CDBRow>
          <CDBCol>
            <CDBCard>
              <CDBCardBody>
                <CDBDataTable
                  striped
                  hover
                  responsive
                  bordered
                  data={tableData}
                  noRecordsFoundMessage="No payments available"
                />
              </CDBCardBody>
            </CDBCard>
          </CDBCol>
        </CDBRow>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handlePaymentConfirm}>Confirm Payment</MenuItem>
      </Menu>
      </CDBContainer>

      <AddPaymentModal show={showAddModal} onClose={handleCloseAddModal} setPayments={setPayments} />
      <EditPaymentModal show={showEditModal} onClose={handleCloseEditModal} selectedPayment={selectedPayment} setPayments={setPayments} />
    </>
  );
};

export default PaymentList;
