import express from 'express';
import { insertProduct, deleteProduct, editProduct, getProductById } from '../controllers/productController.js';

const productRouter = express.Router();

// Route for inserting data into the Product table
productRouter.post('/add', insertProduct);

productRouter.delete('/delete/:product_id', deleteProduct);
productRouter.put('/edit/:product_id', editProduct);
productRouter.get('/view', getProductById);


export default productRouter;