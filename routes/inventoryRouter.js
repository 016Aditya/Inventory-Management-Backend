import express from 'express';
import { deleteInventory, insertInventory } from '../controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/add', insertInventory);
inventoryRouter.delete('/delete', deleteInventory);

export default inventoryRouter;