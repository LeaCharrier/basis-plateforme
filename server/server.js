import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import './config/database.js';
import FigmaRoutes  from './routes/figma.routes.js'
import IssueRoutes  from './routes/issues.routes.js'
import AuthRoutes  from './routes/auth.routes.js'

const port = process.env.PORT || 5000;

const app = express();
dotenv.config({path: './config/.env'});

// middleware
app.use(express.json({
    limit: '50mb'
}));

app.use(cors());

// routes
app.use('/api/figma', FigmaRoutes);
app.use('/api/issues', IssueRoutes);
app.use('/api/auth', AuthRoutes);

// server
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at http://localhost:${port}`);
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



