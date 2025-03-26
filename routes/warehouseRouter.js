// routes/warehouseRoutes.js
import express from 'express';
import { insertWarehouse, deleteWarehouse, getWarehouseById } from '../controllers/warehouseController.js';

const warehouseRouter = express.Router();

warehouseRouter.post('/add', insertWarehouse);
warehouseRouter.delete('/delete', deleteWarehouse);
warehouseRouter.get('/view', getWarehouseById);  


export default warehouseRouter;
