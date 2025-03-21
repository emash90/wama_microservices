
import React, { useState } from 'react';
import { RealPayment as Payment, RealHouse as House, RealTenant as Tenant, getPaymentsByMonth } from '../../data/mockData';
import { FileText, Download, Printer, Calendar } from 'lucide-react';

interface ReportsGeneratorProps {
  payments: Payment[];
  houses: House[];
  tenants: Tenant[];
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ payments, houses, tenants, }) => {
  // console.log("houses", houses)
  // console.log("tenants", tenants)
  // console.log("payments", payments)
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [reportType, setReportType] = useState<'payments' | 'occupancy' | 'revenue'>('payments');
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate last 5 years for the dropdown
  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i);
  const filteredPayments = getPaymentsByMonth(payments, selectedMonth, selectedYear);
  
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount_paid, 0);
  const confirmedRevenue = filteredPayments
    .filter(payment => payment.status === 'confirmed')
    .reduce((sum, payment) => sum + payment.amount_paid, 0);
  const pendingRevenue = filteredPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount_paid, 0);

    // Helper to get tenant name by ID
  const getTenantById = (id: string | null) => {
    console.log("id", id)
    if (!id) return 'None';
    const tenant = tenants.find(tenant => tenant._id === id);
    return tenant ? tenant.tenant_first_name : 'Unknown';
  };

  // Helper to get house by ID
  const getHouseById = (id: string | null) => {
    if (!id) return null;
    return houses.find(house => house._id === id);
  };

  
  // Occupancy data
  const occupiedHouses = houses.filter(house => house.occupied === true).length;
  const vacantHouses = houses.filter(house => house.occupied === false).length;
  const totalHouses = houses.length;
  const occupancyRate = Math.round((occupiedHouses / totalHouses) * 100);
  
  const generatePaymentsCsv = () => {
    const headers = ['Date', 'Tenant', 'Property', 'Amount', 'Status', 'Method', 'Reference'];
    
    const rows = filteredPayments.map(payment => [
      new Date(payment.date_paid).toLocaleDateString(),
      getTenantById(payment.tenant_id),
      getHouseById(payment.house_id)?.house_number || 'Unknown',
      payment.amount_paid.toString(),
      payment.status,
      payment.payment_mode,
      // payment.reference
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
  };
  
  const handleDownload = () => {
    let csvContent = '';
    let filename = '';
    
    if (reportType === 'payments') {
      csvContent = generatePaymentsCsv();
      filename = `payments-${monthNames[selectedMonth]}-${selectedYear}.csv`;
    } else if (reportType === 'occupancy') {
      // Generate occupancy report CSV
      csvContent = 'Property,Status,Type,Rent\n';
      houses.forEach(house => {
        csvContent += `${house.house_number},${house.occupied ? 'Occupied' : 'Vacant'},${house.house_type},${house.house_price}\n`;
      });
      filename = `occupancy-${monthNames[selectedMonth]}-${selectedYear}.csv`;
    } else if (reportType === 'revenue') {
      // Generate revenue report CSV
      csvContent = 'Category,Amount\n';
      csvContent += `Total Revenue,${totalRevenue}\n`;
      csvContent += `Confirmed Revenue,${confirmedRevenue}\n`;
      csvContent += `Pending Revenue,${pendingRevenue}\n`;
      filename = `revenue-${monthNames[selectedMonth]}-${selectedYear}.csv`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-card rounded-xl shadow-sm p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="mr-2" size={20} />
          Reports Generator
        </h2>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Download CSV
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            <Printer size={16} className="mr-2" />
            Print
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as 'payments' | 'occupancy' | 'revenue')}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          >
            <option value="payments">Payments Report</option>
            <option value="occupancy">Occupancy Report</option>
            <option value="revenue">Revenue Report</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="p-4 bg-muted rounded-md mb-6 flex items-center">
        <Calendar className="mr-2 text-muted-foreground" size={18} />
        <span className="text-sm">
          Showing report for <span className="font-medium">{monthNames[selectedMonth]} {selectedYear}</span>
        </span>
      </div>
      
      <div className="mt-6 print:mt-2">
        {reportType === 'payments' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Payments Report</h3>
            {filteredPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Tenant</th>
                      <th className="text-left py-3 px-4 font-medium">Property</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Method</th>
                      <th className="text-left py-3 px-4 font-medium">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => {
                      const house = getHouseById(payment.house_id);
                      return (
                        <tr 
                          key={payment._id} 
                          className="border-b border-border"
                        >
                          <td className="py-3 px-4 text-sm">
                            {new Date(payment.date_paid).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm">{payment.tenantDetails.tenant_first_name} {payment.tenantDetails.tenant_last_name}</td>
                          <td className="py-3 px-4 text-sm">{payment.houseDetails.house_number}</td>
                          <td className="py-3 px-4 text-sm font-medium">${payment.amount_paid.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm">
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
                          <td className="py-3 px-4 text-sm">{payment.payment_mode}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{payment.payment_mode}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border">
                      <td colSpan={3} className="py-3 px-4 text-sm font-medium text-right">Total:</td>
                      <td className="py-3 px-4 text-sm font-bold">${totalRevenue.toLocaleString()}</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payments found for {monthNames[selectedMonth]} {selectedYear}
              </div>
            )}
          </div>
        )}
        
        {reportType === 'occupancy' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Occupancy Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">{occupiedHouses}</div>
                <div className="text-sm text-muted-foreground">Occupied Properties</div>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">{vacantHouses}</div>
                <div className="text-sm text-muted-foreground">Vacant Properties</div>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">{occupancyRate}%</div>
                <div className="text-sm text-muted-foreground">Occupancy Rate</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Property</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Tenant</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map((house) => (
                    <tr 
                      key={house._id} 
                      className="border-b border-border"
                    >
                      <td className="py-3 px-4 text-sm font-medium">{house.house_number}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          house.occupied !== true ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {house.occupied ? 'Occupied' : 'Vacant'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{house.tenantId ? house.tenant_first_name + ' ' + house.tenant_last_name : 'None'}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          house.house_type === 1 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {house.house_type == 1 ? 'Residential' : 'Commercial'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">${house.house_price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {reportType === 'revenue' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Revenue Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">${confirmedRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Confirmed Revenue</div>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold">${pendingRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Pending Revenue</div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-medium mb-3">Revenue Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-sm">Confirmed Payments</td>
                      <td className="py-3 px-4 text-sm font-medium">${confirmedRevenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">
                        {totalRevenue ? Math.round((confirmedRevenue / totalRevenue) * 100) : 0}%
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-sm">Pending Payments</td>
                      <td className="py-3 px-4 text-sm font-medium">${pendingRevenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">
                        {totalRevenue ? Math.round((pendingRevenue / totalRevenue) * 100) : 0}%
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border font-medium">
                      <td className="py-3 px-4 text-sm">Total</td>
                      <td className="py-3 px-4 text-sm">${totalRevenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsGenerator;
