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

const PaymentList = ({ payments, setPayments }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // Prepare data for CDBDataTable
  const tableData = {
    columns: [
      { label: '#', field: 'index', sort: 'asc' },
      { label: 'Tenant Name', field: 'tenant_name', sort: 'asc' },
      { label: 'House', field: 'house_name', sort: 'asc' },
      { label: 'Amount Paid', field: 'amount_paid', sort: 'asc' },
      { label: 'Date', field: 'date_paid', sort: 'asc' },
      { label: 'Status', field: 'status', sort: 'asc' },
    ],
    rows: payments?.map((payment, index) => ({
      index: index + 1,
      tenant_name: payment.tenant_name || 'Unknown Tenant',
      house_name: payment.house_name || 'Unknown House',
      amount_paid: payment.amount_paid || 0,
      date_paid: new Date(payment.date_paid).toLocaleDateString(),
      status: payment.status || 'Pending',
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
      </CDBContainer>

      <AddPaymentModal show={showAddModal} onClose={handleCloseAddModal} setPayments={setPayments} />
    </>
  );
};

export default PaymentList;
