
import React, { useState } from 'react';
import { RealHouse, getTenantById } from '../../data/mockData';
import { Building, ChevronDown, ChevronUp, Search, Plus, Filter } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AddHouseModal from './AddHouseModal';
import EditHouseModal from './EditHouseModal';


interface HousesTableProps {
  houses: RealHouse[];
  setHousesData: React.Dispatch<React.SetStateAction<RealHouse[]>>;
}


const HousesTable: React.FC<HousesTableProps> = ({ houses, setHousesData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof RealHouse>('house_number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Vacant' | 'Occupied'>('All');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedHouse, setSelectedHouse] = useState<RealHouse | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  const handleSort = (field: keyof RealHouse) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, house: RealHouse) => {
    setMenuAnchor(event.currentTarget);
    setSelectedHouse(house);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedHouse(null);
  };

  const handleViewHouse = () => {
    alert(`Viewing house: ${selectedHouse?.house_number}`);
    handleMenuClose();
  };

  const handleEditHouse = () => {
    setShowEditModal(true);
    handleMenuClose();
  };

  const handleDeleteHouse = () => {
    alert(`Deleting house: ${selectedHouse?.house_number}`);
    handleMenuClose();
  };

  const filteredHouses = houses.filter(house => {
    const matchesSearch = house.house_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // getTenantById(house.tenantId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.house_location.toLowerCase().includes(searchTerm.toLowerCase());
      
    // const matchesType = filterType === 'All' ? true : house.house_type == 1 ? 'Residential' : 'Commercial';
    // const matchesStatus = filterStatus === 'All' ? true : house.occupied == true ? 'Occupied' : 'Vacant';
    const matchesType = filterType === 'All' || (filterType === 'Residential' && house.house_type === 1) || (filterType === 'Commercial' && house.house_type !== 1);
    const matchesStatus = filterStatus === 'All' || (filterStatus === 'Occupied' && house.occupied) || (filterStatus === 'Vacant' && !house.occupied);
    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedHouses = [...filteredHouses].sort((a, b) => {
    if (sortField === 'house_number' || sortField === 'house_location' || sortField === 'house_type' || sortField === 'occupied') {
      return sortDirection === 'asc' 
        ? a[sortField].toLocaleString().localeCompare(b[sortField].toLocaleString())
        : b[sortField].toLocaleString().localeCompare(a[sortField].toLocaleString());
    } else if (sortField === 'house_price') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    return 0;
  });

  return (
    <>
    <div className="bg-card rounded-xl shadow-sm p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Building className="mr-2" size={20} />
          Properties
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search properties..."
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
              onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Vacant' | 'Occupied')}
            >
              <option value="All">All Status</option>
              <option value='Vacant'>Vacant</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
            <Plus size={16} className="mr-2" />
            Add Property
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('house_number')}
              >
                <div className="flex items-center">
                  House Number
                  {sortField === 'house_number' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium">Tenant</th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('house_type')}
              >
                <div className="flex items-center">
                  Type
                  {sortField === 'house_type' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('occupied')}
              >
                <div className="flex items-center">
                  Status
                  {sortField === 'occupied' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('house_price')}
              >
                <div className="flex items-center">
                  Rent
                  {sortField === 'house_price' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium cursor-pointer"
                onClick={() => handleSort('house_location')}
              >
                <div className="flex items-center">
                  Address
                  {sortField === 'house_location' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHouses.map((house) => (
              <tr 
                key={house._id} 
                className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4 text-sm">
                  <div className="font-medium">{house.house_number}</div>
                </td>
                <td className="py-4 px-4 text-sm">{}</td>
                <td className="py-4 px-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    house.house_type === 1 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {house.house_type === 1 ? 'Residential' : 'Commercial'}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    house.occupied !== true ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {house.occupied ? 'Occupied' : 'Vacant'}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">${house.house_price.toLocaleString()}</td>
                <td className="py-4 px-4 text-sm">{house.house_location}</td>
                <td className="py-4 px-4 text-right">
                  <IconButton onClick={(event) => handleMenuOpen(event, house)}>
                    <MoreVertIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewHouse}>View House</MenuItem>
          <MenuItem onClick={handleEditHouse}>Edit House</MenuItem>
          <MenuItem onClick={handleDeleteHouse}>Delete House</MenuItem>
        </Menu>
        {sortedHouses.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No properties found with the current filters.
          </div>
        )}
      </div>
    </div>
      <AddHouseModal open={showAddModal} onClose={() => setShowAddModal(false)} setHousesData={setHousesData} />
      <EditHouseModal open={showEditModal} onClose={() => setShowEditModal(false)} selectedHouse={selectedHouse} setHousesData={setHousesData} />
    </>
  );
};

export default HousesTable;
