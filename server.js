import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
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

app.use(cors());

// routes
app.use('/api/book', bookRoutes);
app.use('/api/jsonFigma', jsonFigma);

// server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});







/* CONNECTION TO FIGMA API

//Connection to figma API
var express = require('express')
const fetch = require("node-fetch")
var app = express()

//Our API Key
const figmaAPIKey = '188412-a7e3661b-26ae-4f7b-907b-efe7e9b7bee8'

//Our TEAM ID
const figmaTeamID = '973851200669792478'

//Our PROJECT ID
const figmaProjectID = '30695899'

//Our Demo File
const figmaFileID = 'ZVJ69KKErtjtx2Rz2F7NBw'
*/



