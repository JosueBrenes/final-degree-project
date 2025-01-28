const express = require('express');
const router = express.Router();
const logCambioController = require('../controllers/logCambioController');

router.post('/logs-cambios', logCambioController.createLogCambio);
router.get('/logs-cambios/:id', logCambioController.getLogCambio);
router.put('/logs-cambios/:id', logCambioController.updateLogCambio);
router.delete('/logs-cambios/:id', logCambioController.deleteLogCambio);

module.exports = router;
