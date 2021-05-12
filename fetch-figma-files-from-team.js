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



async function figmaFilesFetch(){

let reqFiles = await fetch('https://api.figma.com/v1/projects/' + figmaProjectID + '/files', {
  method: 'GET',
  headers: {
      'X-Figma-Token': figmaAPIKey
    }
})

let figmaFiles = reqFiles.json()
return figmaFiles
    
}

app.use('/', async function (req, res, next) {
    let result = await figmaFilesFetch().catch(error => console.log(error))
    res.send(JSON.stringify(result))
})


app.listen(3001, console.log("Holy shit, I'm a server and I am listening on port 3001"))
