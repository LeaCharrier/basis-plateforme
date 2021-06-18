import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import './config/database.js';
import FigmaRoutes  from './routes/figma.routes.js'
import IssueRoutes  from './routes/issues.routes.js'
import AuthRoutes  from './routes/auth.routes.js'
import timeout from 'connect-timeout'

const port = process.env.PORT || 5000;

const app = express();
dotenv.config({path: './config/.env'});

// middleware
app.use(express.json({
    limit: '20000mb'
}));

app.use(timeout(900000));

app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
    if (!req.timedout) {
        next()
    }
}

app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};


app.use(allowCrossDomain);

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



