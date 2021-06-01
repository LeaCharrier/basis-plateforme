import {jsonModel} from '../models/jsonFigma.model.js';
import {jsonParser} from '../utils/jsonParser.js';
import {
    apiGetFigmaTeamProjects,
    apiGetFigmaProjectFiles,
    apiGetFigmaFile,
    apiGetFigmaTeamStyles
} from "../actions/index.js";
import { 
    jsonFileFormat, 
    fileFormat, 
    stylesFormat,
    referenceColors
} from "../utils/FileFormat.js";

/**
 * @Route /api/figma/
 * @Method GET
 *
 * @param req
 * @param res
 */
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
 * @Method GET
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
 * @Route /api/figma/team/:teamId/projects/files
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getTeamProjectsFiles(req, res) {
    const {
        teamId
    } = req.params

    try {
        const team = await apiGetFigmaTeamProjects(teamId)

        for (const p of team.projects) {
            const { files } = await apiGetFigmaProjectFiles(p.id)

            p.files = files || []
        }

        res.status(200).send(team);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/:projectId/files
 * @Route /api/figma/projects/:projectId/files
 * @Method GET
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
 * @Method GET
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
 * @Method GET
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
 * @Method GET
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
 * @Method GET
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


/**
 * @Route /api/figma/push
 * @Method POST
 *
 * @param req
 * @param res
 */
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
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function test(req, res) {
    try {
        console.log(req.body)
        console.log(jsonFileFormat(req.body.content))
        res.status(201).json(req.body);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/styles
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getTeamStyles(req, res) {
    const {
        teamId
    } = req.params

    try {
        const styles = await apiGetFigmaTeamStyles(teamId)
        res.status(200).send(styles)
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/colors
 * @Method GET
 *
 * @param req
 * @param res
 */
 export async function getColorAnalysis(req, res) {
    const {
        teamId
    } = req.params

    try {
        let jsons = [];
        const styles = await apiGetFigmaTeamStyles(teamId);
        const colors = stylesFormat(styles);
        const props = await apiGetFigmaFile('abMTwXgnaWaHGU2SLas1ZR');
        const formatedProps = fileFormat(props);
        const refencedColors = referenceColors(colors, formatedProps);
        const projects = await apiGetFigmaTeamProjects(teamId);
        const projectFiles = await apiGetFigmaProjectFiles('30695899');

        for(const file of projectFiles.files) {
            let json = await apiGetFigmaFile(file.key),
                formatedJson = fileFormat(json);
            jsons.push(formatedJson);
        }

        const colorUsage = jsonParser(jsons, refencedColors);
        // console.log(jsons);
        res.status(200).send(colorUsage)
    }
    catch(err) {
        res.status(400).send({err});
    }
}
