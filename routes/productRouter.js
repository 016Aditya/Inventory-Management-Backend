import express from 'express';
import { insertProduct, deleteProduct } from '../controllers/productController.js';

const productRouter = express.Router();

// Route for inserting data into the Product table
productRouter.post('/add', insertProduct);

productRouter.delete('/delete/:product_id', deleteProduct);

export default productRouter;