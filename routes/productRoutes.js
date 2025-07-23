import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductDropdown,
} from '../controllers/productController.js';

const router = express.Router();

// 👇 Must be above '/:id' to avoid conflict
router.get('/dropdown', getProductDropdown);

router
  .route('/')
  .get(getProducts)
  .post(createProduct); // Add token auth if needed

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
