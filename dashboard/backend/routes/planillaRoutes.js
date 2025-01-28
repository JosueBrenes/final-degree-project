const express = require('express');
const router = express.Router();
const planillaController = require('../controllers/planillaController');

router.post('/planillas', planillaController.createPlanilla);
router.get('/planillas/:id', planillaController.getPlanilla);
router.put('/planillas/:id', planillaController.updatePlanilla);
router.delete('/planillas/:id', planillaController.deletePlanilla);

module.exports = router;
