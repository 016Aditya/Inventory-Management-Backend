// routes/warehouseRoutes.js
import express from 'express';
import { insertWarehouse, deleteWarehouse, getWarehouseById, getWarehouses } from '../controllers/warehouseController.js';

const warehouseRouter = express.Router();

warehouseRouter.post('/add', insertWarehouse);
warehouseRouter.delete('/delete', deleteWarehouse);
warehouseRouter.get('/view', getWarehouseById); 
warehouseRouter.get('/warehouses', getWarehouses);


export default warehouseRouter;
