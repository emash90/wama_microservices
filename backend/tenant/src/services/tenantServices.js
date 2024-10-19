const Tenant = require('../models/tenantModel')


const getAllTenants = async () => {
    return await Tenant.find();
  };
  
  const getTenantById = async (id) => {
    return await Tenant.findById(id);
  };
  const findTenantByPhoneNumber = async(tenant_phone) => {
    return await Tenant.findOne({tenant_phone});
  }
  
  const createTenant = async (tenantData) => {
    const newTenant = new Tenant(tenantData);
    return await newTenant.save();
  };
  
  module.exports = {
    getAllTenants,
    getTenantById,
    findTenantByPhoneNumber,
    createTenant
  };