const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.getProdu);
router.get('/:id', userController.getProduById);
router.post('/', userController.createProdu);
router.put('/:id', userController.updateProdu);
router.delete('/:id', userController.deleteProdu)

module.exports = router;