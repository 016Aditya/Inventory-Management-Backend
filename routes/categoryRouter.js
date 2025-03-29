import express from 'express';
import { insertCategory, deleteCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// Route for inserting data into the categories table
categoryRouter.post('/add', insertCategory);

categoryRouter.delete('/delete/:category_id', deleteCategory)

categoryRouter.get('/view/:category_id', getCategoryById);

categoryRouter.put('/update', updateCategory);
export default categoryRouter;