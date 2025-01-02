import React, { useState, useEffect } from 'react'
import ListPayments from '../components/payment/ListPayments'
import { fetchPayments } from '../services/paymentService'

const PaymentPage = () => {
  const [payments, setPayments] = useState()

  const fetchAllPayments = async() => {
    const payment_resp = await fetchPayments()
    console.log("payment resp", payment_resp)
    setPayments(payment_resp)
  }

  useEffect(() => {
    fetchAllPayments();
  }, []); 
  return (
    <>
    <ListPayments payments={payments} setPayments={setPayments} />
    </>
  )
}

export default PaymentPage
