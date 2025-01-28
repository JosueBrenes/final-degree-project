const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.post('/facturas', facturaController.createFactura);
router.get('/facturas/:id', facturaController.getFactura);
router.put('/facturas/:id', facturaController.updateFactura);
router.delete('/facturas/:id', facturaController.deleteFactura);

module.exports = router;
