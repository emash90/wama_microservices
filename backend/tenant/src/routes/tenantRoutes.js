const express = require('express');
const tenantController = require('../controllers/tenantController')

const router = express.Router();

router.get('/', tenantController.getAllTenants);
router.get('/:id', tenantController.getTenantById);
router.post('/', tenantController.createTenant);

module.exports = router;
