const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.post('/proyectos', proyectoController.createProyecto);
router.get('/proyectos/:id', proyectoController.getProyecto);
router.put('/proyectos/:id', proyectoController.updateProyecto);
router.delete('/proyectos/:id', proyectoController.deleteProyecto);

module.exports = router;
