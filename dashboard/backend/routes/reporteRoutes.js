const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.post('/reportes', reporteController.createReporte);
router.get('/reportes/:id', reporteController.getReporte);
router.put('/reportes/:id', reporteController.updateReporte);
router.delete('/reportes/:id', reporteController.deleteReporte);

module.exports = router;
