const tenantService = require('../services/tenantServices');

const getAllTenants = async (req, res, next) => {
  try {
    const tenants = await tenantService.getAllTenants();
    res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
};

const getTenantById = async (req, res, next) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
};

const createTenant = async (req, res, next) => {
  try {
    //check if tenant with same number exists
    const {tenant_phone} = req.body
    const tenantExist = await tenantService.findTenantByPhoneNumber(tenant_phone)
    if (tenantExist) {
        return res.status(403).json({ 
          message: "Tenant with the same number already exists",
          data: tenantExist
         });
      }
    const newTenant = await tenantService.createTenant(req.body);
    res.status(201).json(newTenant);
  } catch (error) {
    next(error);
  }
};

const updateTenant = async (req, res, next) => {
  try {
    const tenantId = req.body._id; // Extract tenant ID from request parameters
    const updateData = req.body; // Get updated data from the request body
    // Update the tenant details
    const updatedTenant = await tenantService.updateTenant(tenantId, updateData);

    res.status(200).json({
      message: 'Tenant updated successfully',
      data: updatedTenant,
    });
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};


module.exports = {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant
};
