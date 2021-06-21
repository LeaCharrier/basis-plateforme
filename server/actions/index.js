import fetch from "node-fetch";
import {figmaApi, getFigmaApiHeaders} from "../utils/FigmaApi.js";

/**
 * @param apiKey
 * @param teamId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaTeamProjects(apiKey, teamId) {
    const data = await fetch(figmaApi.teamProjects(teamId), {
        method: 'GET',
        headers: getFigmaApiHeaders(apiKey)
    })

    return await data.json()
}


/**
 * @param apiKey
 * @param projectId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaProjectFiles(apiKey, projectId) {
    const data = await fetch(figmaApi.projectFiles(projectId), {
        method: 'GET',
        headers: getFigmaApiHeaders(apiKey)
    })

    try {
        return await data.json()
    } catch (err) {
        console.log(err)
        return null
    }
}


/**
 * @param apiKey
 * @param fileId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaFile(apiKey, fileId) {
    const data = await fetch(figmaApi.file(fileId), {
        method: 'GET',
        headers: getFigmaApiHeaders(apiKey)
    })

    console.log('data file')
    console.log(data)
    console.log(data.json)

    try {
        return await data.json()
    } catch (err) {
        console.log('file error')
        console.log(err)
        return null
    }
}

/**
 * @param apiKey
 * @param teamId
 * @returns {Promise<*>}
 */
 export async function apiGetFigmaTeamStyles(apiKey, teamId) {
    const data = await fetch(figmaApi.teamStyles(teamId), {
        method: 'GET',
        headers: getFigmaApiHeaders(apiKey)
    }).catch(e => console.log(e))

    return await data.json()
}
