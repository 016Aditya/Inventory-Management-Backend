// routes/warehouseRoutes.js
import express from 'express';
import { insertWarehouse, deleteWarehouse } from '../controllers/warehouseController.js';

const warehouseRouter = express.Router();

warehouseRouter.post('/add', insertWarehouse);
warehouseRouter.delete('/delete', deleteWarehouse);

export default warehouseRouter;
