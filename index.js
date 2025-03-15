import express from 'express';
import dotenv from 'dotenv';
import categoryRouter from './routes/categoryRouter.js';

dotenv.config(); // Load environment variables
const app = express();

const PORT = process.env.PORT;


// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/categories', categoryRouter);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
