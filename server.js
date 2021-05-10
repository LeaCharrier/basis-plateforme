import express from 'express';
import dotenv from 'dotenv';
import * as fs from 'fs';
import './config/database.js';
import { bookRoutes } from './routes/book.routes.js';
import { jsonFigma } from './routes/jsonFigma.routes.js';

const app = express();
dotenv.config({path: './config/.env'});

// middleware
app.use(express.json({
    limit: '50mb'
}));

// routes
app.use('/api/book', bookRoutes);
app.use('/api/jsonFigma', jsonFigma);

// server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});