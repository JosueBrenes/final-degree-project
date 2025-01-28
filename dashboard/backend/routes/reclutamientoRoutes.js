const express = require('express');
const router = express.Router();
const reclutamientoController = require('../controllers/reclutamientoController');

router.post('/reclutamiento', reclutamientoController.createReclutamiento);
router.get('/reclutamiento/:id', reclutamientoController.getReclutamiento);
router.put('/reclutamiento/:id', reclutamientoController.updateReclutamiento);
router.delete('/reclutamiento/:id', reclutamientoController.deleteReclutamiento);

module.exports = router;
