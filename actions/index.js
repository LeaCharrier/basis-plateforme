import fetch from "node-fetch";
import {figmaApi, getFigmaApiHeaders} from "../utils/FigmaApi.js";
import constants from "../config/constants.js";

/**
 * @param teamId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaTeamProjects(teamId) {
    const data = await fetch(figmaApi.teamProjects(teamId), {
        method: 'GET',
        headers: getFigmaApiHeaders(constants.figmaAPIKey)
    })

    return await data.json()
}


/**
 * @param projectId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaProjectFiles(projectId) {
    const data = await fetch(figmaApi.projectFiles(projectId), {
        method: 'GET',
        headers: getFigmaApiHeaders(constants.figmaAPIKey)
    })

    return await data.json()
}


/**
 * @param fileId
 * @returns {Promise<*>}
 */
export async function apiGetFigmaFile(fileId) {
    const data = await fetch(figmaApi.file(fileId), {
        method: 'GET',
        headers: getFigmaApiHeaders(constants.figmaAPIKey)
    }).catch(e => console.log(e))

    return await data.json()
}
