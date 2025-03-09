import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
const app = express();

const PORT = process.env.PORT;


// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Server!');
});

// Sample API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from API !' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;