import express from 'express';
import { deleteInventory, insertInventory, getInventoryById } from '../controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/add', insertInventory);
inventoryRouter.delete('/delete', deleteInventory);
inventoryRouter.get('/view', getInventoryById);  


export default inventoryRouter;