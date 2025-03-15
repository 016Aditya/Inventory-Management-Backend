import express from 'express';
import { insertCategory, deleteCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// Route for inserting data into the categories table
categoryRouter.post('/add', insertCategory);

categoryRouter.delete('/delete/:category_id', deleteCategory)

export default categoryRouter;