import {jsonModel} from '../models/jsonFigma.model.js';
import {
    apiGetFigmaTeamProjects,
    apiGetFigmaProjectFiles,
    apiGetFigmaFile
} from "../actions/index.js";
import fileFormat from "../utils/FileFormat.js";

export async function get(req, res) {
    try {
        res.status(200).json({
		   "colors": {
		      "grey": {
		         "value":"rgba(255, 255, 255, 1)"
		      },
		      "blue": {
		         "value":"rgba(255, 255, 255, 1)"
		      }
		   }
		});
    }
    catch(err) {
        res.status(400).send({err});
    }
}


/**
 * @Route /api/figma/team/:teamId/projects
 *
 * @param req
 * @param res
 */
export async function getTeamProjects(req, res) {
    const {
        teamId
    } = req.params

    try {
        const json = await apiGetFigmaTeamProjects(teamId)

        res.status(200).send(json);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/:projectId/files
 * @Route /api/figma/projects/:projectId/files
 *
 * @param req
 * @param res
 */
export async function getProjectFiles(req, res) {
    const {
        projectId
    } = req.params

    try {
        const json = await apiGetFigmaProjectFiles(projectId)

        res.status(200).send(json);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/i/:projectIndex/files
 *
 * @param req
 * @param res
 */
export async function getTeamProjectFilesByIndex(req, res) {
    const {
        teamId,
        projectIndex
    } = req.params

    try {
        const teamProjects = await apiGetFigmaTeamProjects(teamId)

        const {projects} = teamProjects

        let project = projects[projectIndex]

        const projectFiles = await apiGetFigmaProjectFiles(project.id)

        res.status(200).send(projectFiles);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/:projectId/files/fileId
 * @Route /api/figma/projects/:projectId/files/fileId
 * @Route /api/figma/files/:fileId
 *
 * @param req
 * @param res
 */
export async function getFile(req, res) {
    const {
        fileId
    } = req.params

    try {
        const file = await apiGetFigmaFile(fileId)

        const formatedFile = fileFormat(file)

        res.status(200).send(formatedFile);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/:projectId/files/i/:fileIndex
 * @Route /api/figma/projects/:projectId/files/i/:fileIndex
 *
 * @param req
 * @param res
 */
export async function getFileByIndex(req, res) {
    const {
        projectId,
        fileIndex
    } = req.params

    try {
        const projectFiles = await apiGetFigmaProjectFiles(projectId)

        const {
            files
        } = projectFiles

        let projectFile = files[fileIndex]

        const file = await apiGetFigmaFile(projectFile.key)

        const formatedFile = fileFormat(file)

        res.status(200).send(formatedFile);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/i/:projectIndex/files/i/:fileIndex
 *
 * @param req
 * @param res
 */
export async function getTeamProjectFileByIndexes(req, res) {
    const {
        teamId,
        projectIndex,
        fileIndex
    } = req.params

    try {
        const teamProjects = await apiGetFigmaTeamProjects(teamId)

        const {projects} = teamProjects

        let project = projects[projectIndex]

        const projectFiles = await apiGetFigmaProjectFiles(project.id)

        const {
            files
        } = projectFiles

        let projectFile = files[fileIndex]

        const file = await apiGetFigmaFile(projectFile.key)

        const formatedFile = fileFormat(file)

        res.status(200).send(formatedFile);
    }
    catch(err) {
        res.status(400).send({err});
    }
}


export async function push(req, res) {
    const {title} = req.body

    try {
        const json = await jsonModel.create({category: title});
        res.status(201).json({item: json._id});
    }
    catch(err) {
        res.status(400).send({err});
    }
}


/**
 * @Route /api/figma/test
 *
 * @param req
 * @param res
 */
export async function test(req, res) {
    try {
        console.log(req.body)
        res.status(201).json(req.body);
    }
    catch(err) {
        res.status(400).send({err});
    }
}
