const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware(['admin']), productController.createProduct);
router.get('/', authMiddleware(['admin', 'manager']), productController.getProducts);
router.put('/:id', authMiddleware(['admin', 'manager']), productController.updateProduct);
router.delete('/:id', authMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
