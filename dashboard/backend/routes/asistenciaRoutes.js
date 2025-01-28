const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

router.post('/asistencias', asistenciaController.createAsistencia);
router.get('/asistencias/:id', asistenciaController.getAsistencia);
router.put('/asistencias/:id', asistenciaController.updateAsistencia);
router.delete('/asistencias/:id', asistenciaController.deleteAsistencia);

module.exports = router;
