const express = require('express');
const router = express.Router();
const contabilidadController = require('../controllers/contabilidadController');

router.post('/contabilidad', contabilidadController.createTransaccion);
router.get('/contabilidad/:id', contabilidadController.getTransaccion);
router.put('/contabilidad/:id', contabilidadController.updateTransaccion);
router.delete('/contabilidad/:id', contabilidadController.deleteTransaccion);

module.exports = router;
