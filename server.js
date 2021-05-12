import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import './config/database.js';
import FigmaRoutes  from './routes/figma.routes.js'

const app = express();
dotenv.config({path: './config/.env'});

// middleware
app.use(express.json({
    limit: '50mb'
}));

app.use(cors());

// routes
app.use('/api/figma', FigmaRoutes);

// server
app.listen(5000, () => {
    console.log(`App listening at http://localhost:${5000}`);
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



