
import React, { useState } from 'react';
import { RealHouse, RealTenant, getHouseById } from '../../data/mockData';
import { Users, ChevronDown, ChevronUp, Search, Plus } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AddTenantModal from './AddTenantModal';
import EditTenantModal from './EditTenantModal';
import ConfirmationModal from './ConfirmationModal';
import { updateTenant } from '@/services/tenantService';



interface TenantsTableProps {
  tenants: RealTenant[];
  setTenantsData: React.Dispatch<React.SetStateAction<RealTenant[]>>;
  housesData: RealHouse[];
}

const TenantsTable: React.FC<TenantsTableProps> = ({ tenants, setTenantsData, housesData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof RealTenant>('tenant_first_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTenant, setSelectedTenant] = useState<RealTenant | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSort = (field: keyof RealTenant) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, tenant: RealTenant) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTenant(tenant);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedTenant(null);
  };
  const hideMenu = () => {
    setMenuAnchor(null);
  };


  const handleViewTenant = () => {
    if (selectedTenant) {
      console.log(selectedTenant);
    }
    handleMenuClose();
  };

  const handleEditTenant = () => {
    if (selectedTenant) {
      setShowEditModal(true);
    }
    handleMenuClose();
  };

  const handleConfirmationModalShow = () => {
    hideMenu();
    setShowConfirmationModal(true);
  };
  

  const handleDeactivateTenant = async () => {
    if (selectedTenant) {
      const newTenantDetails = {
        ...selectedTenant,
        active: false,
      };
  
      try {
        const response = await updateTenant(selectedTenant._id, newTenantDetails);
  
        if (response) {
  
          // Remove the deactivated tenant from the list
          setTenantsData((prevTenants) =>
            prevTenants.filter((tenant) => tenant._id !== selectedTenant._id)
          );
  
          setShowConfirmationModal(false);
        } else {
          console.error("Failed to deactivate tenant: No data in response");
        }
      } catch (error) {
        console.error("Error deactivating tenant:", error);
      }
    } else {
      console.error("No tenant selected for deactivation");
    }
  };
  

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.tenant_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tenant_phone.includes(searchTerm) ||
      tenant.tenant_email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === 'All' ? true : tenant.tenant_house === filterType;
    const matchesStatus = filterStatus === 'All' ? true : tenant.active === (filterStatus === 'Active');
  
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    if (sortField === 'tenant_first_name' || sortField === 'tenant_email' || sortField === 'tenant_phone' || sortField === 'tenant_house' || sortField === 'active') {
      return sortDirection === 'asc' 
        ? a[sortField].toLocaleString().localeCompare(b[sortField].toLocaleString())
        : b[sortField].toLocaleString().localeCompare(a[sortField].toLocaleString());
    } else if (sortField === 'balance') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    return 0;
  });

  // const getHouseNumber = (houseId: string | null) => {
  //   if (!houseId) return 'None';
  //   const house = getHouseById(houseId);
  //   return house ? house.house_number : 'Unknown';
  // };

  return (
    <>
    <div className="bg-card rounded-xl shadow-sm p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="mr-2" size={20} />
          Tenants
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search tenants..."
              className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'All' | 'Residential' | 'Commercial')}
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            
            <select
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
            <Plus size={16} className="mr-2" />
            Add Tenant
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('tenant_first_name')}
              >
                <div className="flex items-center">
                  Name
                  {sortField === 'tenant_first_name' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('tenant_phone')}
              >
                <div className="flex items-center">
                  Phone
                  {sortField === 'tenant_phone' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('tenant_email')}
              >
                <div className="flex items-center">
                  Email
                  {sortField === 'tenant_email' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium">House</th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('tenant_house')}
              >
                <div className="flex items-center">
                  Type
                  {sortField === 'tenant_house' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('balance')}
              >
                <div className="flex items-center">
                  Balance
                  {sortField === 'balance' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTenants.map((tenant) => (
              <tr 
                key={tenant._id} 
                className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4 text-sm">
                  <div className="font-medium">{tenant.tenant_first_name}</div>
                  <div className="text-muted-foreground text-xs">Since {new Date(tenant.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="py-4 px-4 text-sm">{tenant.tenant_phone}</td>
                <td className="py-4 px-4 text-sm">{tenant.tenant_email}</td>
                <td className="py-4 px-4 text-sm">{tenant.tenant_house}</td>
                <td className="py-4 px-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tenant.house_type === 1 && 'bg-green-100 text-green-800' || 
                    tenant.house_type === 2 && 'bg-purple-100 text-purple-800'
                  }`}>
                    {tenant.house_type == 1 ? 'Residential' : 'Commercial' }
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  <span className={tenant.balance > 0 ? 'text-red-600' : 'text-green-600'}>
                    ${tenant.balance}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <IconButton onClick={(event) => handleMenuOpen(event, tenant)}>
                      <MoreVertIcon />
                    </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewTenant}>View Tenant</MenuItem>
          <MenuItem onClick={handleEditTenant}>Edit Tenant</MenuItem>
          <MenuItem onClick={handleConfirmationModalShow}>Deactivate Tenant</MenuItem>
        </Menu>
        {sortedTenants.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No tenants found with the current filters.
          </div>
        )}
      </div>
    </div>
    <AddTenantModal open={showAddModal} onClose={() => setShowAddModal(false)} setTenantsData={setTenantsData} houses={housesData} />
    <EditTenantModal open={showEditModal} onClose={() => setShowEditModal(false)} tenant= {selectedTenant} setTenantsData={setTenantsData} />
    <ConfirmationModal open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={handleDeactivateTenant} />
    </>
  );
};

export default TenantsTable;
