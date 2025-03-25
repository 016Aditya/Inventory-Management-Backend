import express from 'express';
import dotenv from 'dotenv';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import warehouseRouter from './routes/warehouseRouter.js';
import inventoryRouter from './routes/inventoryRouter.js';

dotenv.config(); // Load environment variables
const app = express();

const PORT = process.env.PORT;


// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/categories', categoryRouter);

app.use('/api/products', productRouter);

app.use('/api/warehouse', warehouseRouter);

app.use('/api/inventory', inventoryRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
