const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacionController');

router.post('/cotizaciones', cotizacionController.createCotizacion);
router.get('/cotizaciones/:id', cotizacionController.getCotizacion);
router.put('/cotizaciones/:id', cotizacionController.updateCotizacion);
router.delete('/cotizaciones/:id', cotizacionController.deleteCotizacion);

module.exports = router;
