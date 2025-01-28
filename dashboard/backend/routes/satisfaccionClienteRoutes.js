const express = require('express');
const router = express.Router();
const satisfaccionClienteController = require('../controllers/satisfaccionClienteController');

router.post('/satisfaccion-cliente', satisfaccionClienteController.createSatisfaccion);
router.get('/satisfaccion-cliente/:id', satisfaccionClienteController.getSatisfaccion);
router.put('/satisfaccion-cliente/:id', satisfaccionClienteController.updateSatisfaccion);
router.delete('/satisfaccion-cliente/:id', satisfaccionClienteController.deleteSatisfaccion);

module.exports = router;
