import express from 'express';
import { insertProduct, deleteProduct, editProduct, getProductById, getProducts } from '../controllers/productController.js';

const productRouter = express.Router();

// Route for inserting data into the Product table
productRouter.post('/add', insertProduct);

productRouter.delete('/delete/:product_id', deleteProduct);
productRouter.put('/edit/:product_id', editProduct);
productRouter.get('/view', getProductById);
productRouter.get('/products',getProducts );


export default productRouter;