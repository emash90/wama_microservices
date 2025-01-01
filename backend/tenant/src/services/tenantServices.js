const Tenant = require('../models/tenantModel')

const getTenantsPipeline = () => {
    return [
      {
        $lookup: {
          from: 'houses',
          localField: 'tenant_house_id',
          foreignField: '_id',
          as: 'tenant_house',
        },
      },
      {
        $unwind: {
          'path': '$tenant_house',
        }
      },
      {
        $sort: {
          'createdAt': -1,
        }
      },
      {
        $project: {
          tenant_first_name: 1,
          tenant_last_name: 1,
          tenant_phone: 1,
          tenant_rent: 1,
          tenant_house: '$tenant_house.house_number',
        },
      },
    ];
  }


const getAllTenants = async () => {
    const pipeline = getTenantsPipeline();
    return await Tenant.aggregate(pipeline);
  };
  
  const getTenantById = async (id) => {
    return await Tenant.findById(id);
  };
  const findTenantByPhoneNumber = async(tenant_phone) => {
    return await Tenant.findOne({tenant_phone});
  }
  
  const createTenant = async (tenantData) => {
    const newTenant = new Tenant(tenantData);
    const response =  await newTenant.save();
    //add house details to response
    const pipeline = getTenantsPipeline();
    const tenant = await Tenant.aggregate(pipeline).match({_id: response._id});
    return tenant;
  };
  
  module.exports = {
    getAllTenants,
    getTenantById,
    findTenantByPhoneNumber,
    createTenant
  };