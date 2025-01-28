const express = require('express');
const router = express.Router();
const redSocialController = require('../controllers/redSocialController');

router.post('/redes-sociales', redSocialController.createRedSocial);
router.get('/redes-sociales/:id', redSocialController.getRedSocial);
router.put('/redes-sociales/:id', redSocialController.updateRedSocial);
router.delete('/redes-sociales/:id', redSocialController.deleteRedSocial);

module.exports = router;
