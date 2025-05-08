import express from 'express';
import { deleteInventory, insertInventory, getInventoryById, getInventories } from '../controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/add', insertInventory);
inventoryRouter.delete('/delete', deleteInventory);
inventoryRouter.get('/view', getInventoryById);  
inventoryRouter.get('/inventories', getInventories); // Assuming you have a function to get all inventories


export default inventoryRouter;