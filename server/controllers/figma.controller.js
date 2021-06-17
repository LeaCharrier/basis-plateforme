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
 * @Route /api/figma/team/:teamId/projects
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function getTeamProjectsPub(req, res) {
    const {
        teamId
    } = req.params

    const {
        api
    } = req.body

    try {
        const json = await apiGetFigmaTeamProjects(api, teamId)

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


    const {
        userData
    } = req

    try {
        const team = await apiGetFigmaTeamProjects(userData.api, teamId)

        for (const p of team.projects) {
            const { files } = await apiGetFigmaProjectFiles(userData.api, p.id)

            p.files = files || []
        }

        res.status(200).send(team);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/files
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getTeamFiles(req, res) {
    const {
        teamId
    } = req.params

    const {
        userData
    } = req

    try {
        const team = await apiGetFigmaTeamProjects(userData.api, teamId)

        let fileList = []

        for (const p of team.projects) {
            const { files } = await apiGetFigmaProjectFiles(userData.api, p.id)

            fileList = [...fileList, ...(files || [])]
        }

        res.status(200).send(fileList);
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

    const {
        userData
    } = this.props

    try {
        const json = await apiGetFigmaProjectFiles(userData.api, projectId)

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


    const {
        userData
    } = req

    try {
        const teamProjects = await apiGetFigmaTeamProjects(userData.api, teamId)

        const {projects} = teamProjects

        let project = projects[projectIndex]

        const projectFiles = await apiGetFigmaProjectFiles(userData.api, project.id)

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

    const {
        userData
    } = req

    try {
        const file = await apiGetFigmaFile(userData.api, fileId)

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

    const {
        userData
    } = req

    try {
        const projectFiles = await apiGetFigmaProjectFiles(userData.api, projectId)

        const {
            files
        } = projectFiles

        let projectFile = files[fileIndex]

        const file = await apiGetFigmaFile(userData.api, projectFile.key)

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

    const {
        userData
    } = req

    try {
        const teamProjects = await apiGetFigmaTeamProjects(userData.api, teamId)

        const {projects} = teamProjects

        let project = projects[projectIndex]

        const projectFiles = await apiGetFigmaProjectFiles(userData.api, project.id)

        const {
            files
        } = projectFiles

        let projectFile = files[fileIndex]

        const file = await apiGetFigmaFile(userData.api, projectFile.key)

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

    const {
        userData
    } = req

    try {
        const styles = await apiGetFigmaTeamStyles(userData.api, teamId)
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

    const {
        userData
    } = req

    try {
        let jsons = [];
        const styles = await apiGetFigmaTeamStyles(userData.api, teamId);
        const colors = stylesFormat(styles);
        const props = await apiGetFigmaFile(userData.api, 'abMTwXgnaWaHGU2SLas1ZR');
        const formatedProps = fileFormat(props);
        const refencedColors = referenceColors(colors, formatedProps);
        const teamProjects = await apiGetFigmaTeamProjects(userData.api, teamId);

        for(const project of teamProjects.projects) {
            let projectFiles = await apiGetFigmaProjectFiles(userData.api, project.id);

            for(const file of projectFiles.files) {
                let json = await apiGetFigmaFile(userData.api, file.key),
                    formatedJson = fileFormat(json, {
                        project: {
                            key: file.key,
                            name: file.name,
                            last_modified: file.last_modified
                        }
                    });
                jsons.push(formatedJson);
            }
        }

        const colorUsage = jsonParser(jsons, refencedColors);
        res.status(200).send(colorUsage)
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
export async function getColorAnalysisPub(req, res) {
    const {
        teamId
    } = req.params

    const {
        api
    } = req.body

    try {
        let jsons = [];
        const styles = await apiGetFigmaTeamStyles(api, teamId);
        const colors = stylesFormat(styles);
        const props = await apiGetFigmaFile(api, 'abMTwXgnaWaHGU2SLas1ZR');
        const formatedProps = fileFormat(props);
        const refencedColors = referenceColors(colors, formatedProps);
        const teamProjects = await apiGetFigmaTeamProjects(api, teamId);

        for(const project of teamProjects.projects) {
            let projectFiles = await apiGetFigmaProjectFiles(api, project.id);

            for(const file of projectFiles.files) {
                let json = await apiGetFigmaFile(api, file.key),
                    formatedJson = fileFormat(json, {
                        project: {
                            key: file.key,
                            name: file.name,
                            last_modified: file.last_modified
                        }
                    });
                jsons.push(formatedJson);
            }
        }

        const colorUsage = jsonParser(jsons, refencedColors);
        res.status(200).send(colorUsage)
    }
    catch(err) {
        res.status(400).send({err});
    }
}
