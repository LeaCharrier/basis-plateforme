//Connection to figma API
var express = require('express')
const fetch = require("node-fetch")
var app = express()

//Our API Key
const figmaAPIKey = '188412-a7e3661b-26ae-4f7b-907b-efe7e9b7bee8'

//Our Demo File
const figmaFileID = 'ZVJ69KKErtjtx2Rz2F7NBw'

// Convert RGB to HEX
function rgbToHex(r, g, b) {
    const color = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    if (color.length > 7) {
        return color.slice(0, 7);
    }
    return color;
};


async function figmaColorsFetch(figmaFileID){

    let result = await fetch('https://api.figma.com/v1/files/' + figmaFileID , {
        method: 'GET',
        headers: {
            'X-Figma-Token': figmaAPIKey
        }
    })

    let figmaFileStruct = await result.json()
    // Get all frames
    let figmaFrames = figmaFileStruct.document.children
        .filter(child => child.type === 'CANVAS')[0].children
        .filter(child => child.type === 'FRAME')[0].children

        //Get all rectangles using shades
        .filter(child => child.type === 'RECTANGLE')
        
        //Get every colors
        .filter(child => child.fills[0].color)
        
        .map(shade => {
            const { r, g, b } = shade.fills[0].color;
            const nodeId = shade.fills;
            return {
                name: shade.name,
                color: {
                    r: shade.fills[0].color.r,
                    g: shade.fills[0].color.g,
                    b: shade.fills[0].color.b,
                    hex: rgbToHex(r * 255, g * 255, b * 255),
                }
        }
        })
        .filter((shade) => !!shade.name)
    
  return figmaFrames
  
}


app.use('/', async function (req, res, next) {
    let result = await figmaColorsFetch(figmaFileID).catch(error => console.log(error))
    res.send(JSON.stringify(result))
})


app.listen(3001, console.log("Holy shit, I'm a server and I am listening on port 3001"))


