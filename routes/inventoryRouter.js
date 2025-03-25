import express from 'express';
import { insertInventory } from '../controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/add', insertInventory);

export default inventoryRouter;