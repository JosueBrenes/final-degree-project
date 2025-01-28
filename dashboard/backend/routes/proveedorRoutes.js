const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.post('/proveedores', proveedorController.createProveedor);
router.get('/proveedores/:id', proveedorController.getProveedor);
router.put('/proveedores/:id', proveedorController.updateProveedor);
router.delete('/proveedores/:id', proveedorController.deleteProveedor);

module.exports = router;
