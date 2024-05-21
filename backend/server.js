import express from 'express';
import connectDB from './db';
import cors from 'cors';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';
import propertyRoutes from './routes/propertyRoutes';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
