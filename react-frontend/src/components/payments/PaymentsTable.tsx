
import React, { useState } from 'react';
import { RealPayment as Payment, getTenantById, getHouseById, RealTenant as Tenant } from '../../data/mockData';
import { CreditCard, ChevronDown, ChevronUp, Search, Plus, Filter } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AddPaymentModal from './AddPaymentModal';
import { updatePayment } from '@/services/paymentService';


interface PaymentsTableProps {
  payments: Payment[];
  setPaymentData: React.Dispatch<React.SetStateAction<Payment[]>>;
  tenantData: Tenant[];
  onAddPayment: (data: Payment) => void; 
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments, setPaymentData, tenantData, onAddPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Payment>('date_paid');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Confirmed' | 'Pending' | 'Received'>('All');
  const [filterMethod, setFilterMethod] = useState<'All' | 'Cash' | 'Bank Transfer' | 'Check' | 'Credit Card'>('All');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleSort = (field: keyof Payment) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, payment: Payment) => {
      setMenuAnchor(event.currentTarget);
      setSelectedPayment(payment);
    };
  
    const handleMenuClose = () => {
      setMenuAnchor(null);
      setSelectedPayment(null);
    };
  
    const handleViewPayment = () => {
      alert(`Viewing house: ${selectedPayment?._id}`);
      handleMenuClose();
    };
  
    const handleEditPayment = () => {
      setShowEditModal(true);
      handleMenuClose();
    };
  
    const handleConfirmPayment = async() => {
        if (!selectedPayment) return;
      
        const updatedPayment = { ...selectedPayment, status: "confirmed" };
      
        try {
          const response = await updatePayment(updatedPayment._id || "", updatedPayment);
      
          if (response) {
            setPaymentData((prev) =>
              prev.map((payment) =>
                payment._id === updatedPayment._id ? updatedPayment : payment
              )
            );
          }
        } catch (error) {
          console.error("Error confirming payment:", error);
        }
      
        handleMenuClose();
      };

  const filteredPayments = payments.filter(payment => {
    const tenantName = getTenantById(payment.tenant_id).toLowerCase();
    const houseNumber = getHouseById(payment.house_id)?.house_number.toLowerCase() || '';
    
    const matchesSearch = 
      tenantName.includes(searchTerm.toLowerCase()) ||
      houseNumber.includes(searchTerm.toLowerCase())
      // payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus === 'All' ? true : payment.status === filterStatus;
    const matchesMethod = filterMethod === 'All' ? true : payment.payment_mode === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortField === 'date_paid') {
      return sortDirection === 'asc' 
        ? new Date(a.date_paid).getTime() - new Date(b.date_paid).getTime()
        : new Date(b.date_paid).getTime() - new Date(a.date_paid).getTime();
    } else if (sortField === 'amount_paid') {
      return sortDirection === 'asc' ? a.amount_paid - b.amount_paid : b.amount_paid - a.amount_paid;
    } else if (sortField === 'status' || sortField === 'payment_mode') {
      return sortDirection === 'asc' 
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
    return 0;
  });

  return (
    <>
    <div className="bg-card rounded-xl shadow-sm p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <CreditCard className="mr-2" size={20} />
          Payments
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search payments..."
              className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Confirmed' | 'Pending' | 'Received')}
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Received">Received</option>
            </select>
            
            <select
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value as 'All' | 'Cash' | 'Bank Transfer' | 'Check' | 'Credit Card')}
            >
              <option value="All">All Methods</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
          
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
            <Plus size={16} className="mr-2" />
            Record Payment
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('date_paid')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'date_paid' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium">Tenant</th>
              <th className="text-left py-3 px-4 font-medium">Property</th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('amount_paid')}
              >
                <div className="flex items-center">
                  Amount
                  {sortField === 'amount_paid' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('payment_mode')}
              >
                <div className="flex items-center">
                  Payment Method
                  {sortField === 'payment_mode' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment) => {
              const house = getHouseById(payment.house_id);
              return (
                <tr 
                  key={payment._id} 
                  className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 text-sm">
                    {new Date(payment.date_paid).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium">{getTenantById(payment.tenant_id)}</td>
                  <td className="py-4 px-4 text-sm">{house?.house_number || 'Unknown'}</td>
                  <td className="py-4 px-4 text-sm font-medium">${payment.amount_paid.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm">{payment.payment_mode}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : payment.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <IconButton onClick={(event) => handleMenuOpen(event, payment)}>
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewPayment}>View Payment</MenuItem>
          <MenuItem onClick={handleEditPayment}>Edit Payment</MenuItem>
          <MenuItem onClick={handleConfirmPayment} disabled={selectedPayment?.status === 'confirmed'} >Confirm Payment</MenuItem>
        </Menu>
        {sortedPayments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No payments found with the current filters.
          </div>
        )}
      </div>
    </div>
    <AddPaymentModal open={showAddModal} onClose={() => setShowAddModal(false)} setPaymentData={setPaymentData} tenantData={tenantData} onAddPayment={onAddPayment} />
    </>
  );
};

export default PaymentsTable;
