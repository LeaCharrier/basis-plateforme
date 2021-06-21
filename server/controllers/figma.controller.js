import {jsonModel} from '../models/jsonFigma.model.js';
import {teamModel} from "../models/Team.model.js";
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
                    "value": "rgba(255, 255, 255, 1)"
                },
                "blue": {
                    "value": "rgba(255, 255, 255, 1)"
                }
            }
        });
    } catch (err) {
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


    const {
        userData
    } = req

    try {
        const json = await apiGetFigmaTeamProjects(userData.api, teamId)

        res.end(JSON.stringify(json));
    } catch (err) {
        res.end(JSON.stringify({err}));
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

        res.end(JSON.stringify(json));
    } catch (err) {
        res.end(JSON.stringify({err}));
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
            const {files} = await apiGetFigmaProjectFiles(userData.api, p.id)

            p.files = files || []
        }

        res.end(JSON.stringify(team));
    } catch (err) {
        res.end(JSON.stringify({err}));
    }
}

/**
 * @Route /api/figma/team/:teamId/projects/files
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function getTeamProjectsFilesPub(req, res) {
    const {
        teamId
    } = req.params

    const {
        api
    } = req.body

    try {
        const team = await apiGetFigmaTeamProjects(api, teamId)

        let list = []

        for (const p of team.projects) {
            const {files} = await apiGetFigmaProjectFiles(api, p.id)

            list = [...files, ...list]
        }

        res.end(JSON.stringify(list));
    } catch (err) {
        res.end(JSON.stringify({err}));
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
            const {files} = await apiGetFigmaProjectFiles(userData.api, p.id)

            fileList = [...fileList, ...(files || [])]
        }

        res.end(JSON.stringify(fileList));
    } catch (err) {
        res.end(JSON.stringify({err}));
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

        res.end(JSON.stringify(json));
    } catch (err) {
        res.end(JSON.stringify({err}));
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

        res.end(JSON.stringify(projectFiles));
    } catch (err) {
        res.end(JSON.stringify({err}));
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
    } catch (err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/files/:fileId
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function getFilePub(req, res) {
    const {
        fileId
    } = req.params

    const {
        api
    } = req.query

    try {
        console.log('1')
        const file = await apiGetFigmaFile(api, fileId)
        console.log('2')
        const formatedFile = fileFormat(file, {
                project: {
                    key: file.key,
                    name: file.name,
                    last_modified: file.last_modified
                }
            }
        )

        console.log('done')
        res.end(JSON.stringify({formated: formatedFile, raw: file}));
    } catch (err) {
        res.end(null);
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    const {
        team
    } = req.body

    try {
        const { colors } = jsonFileFormat(req.body.content)

        console.log(colors.length)

        let existingTeam = await teamModel.findOne({ teamId: team })

        let response

        if (existingTeam) {
            existingTeam.colors = colors

            response = await existingTeam.save()
        } else {
            const newTeam = new teamModel({
                teamId: team,
                colors
            })

            response = await newTeam.save()
        }

        res.status(201).json(response);
    } catch (err) {
        console.log(err)
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
    } catch (err) {
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

        for (const project of teamProjects.projects) {
            let projectFiles = await apiGetFigmaProjectFiles(userData.api, project.id);

            for (const file of projectFiles.files) {
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
    } catch (err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/figma/team/:teamId/colors
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function getColorAnalysisPub(req, res) {
    const {
        teamId
    } = req.params

    const {
        api,
        system,
        systemFile,
        jsons
    } = req.body

    try {
        const styles = await apiGetFigmaTeamStyles(api, teamId);
        const colors = stylesFormat(styles);
        const props = (systemFile) ? systemFile : await apiGetFigmaFile(api, system);
        const formatedProps = fileFormat(props);
        const refencedColors = referenceColors(colors, formatedProps);
        const colorUsage = jsonParser(jsons, refencedColors, colors);

        res.end(JSON.stringify(colorUsage))
    } catch (err) {
        console.log("err colors")
        console.log(err)
        res.end(JSON.stringify({err}))
    }
}


/**
 * @Route /api/figma/team/:teamId/colors
 * @Method POST
 *
 * @param req
 * @param res
 */
// export async function getColorAnalysisPub(req, res) {
//     const {
//         teamId
//     } = req.params
//
//     const {
//         api,
//         system
//     } = req.query
//
//     try {
//         console.log(1)
//         let jsons = [];
//         console.log(2)
//         const styles = await apiGetFigmaTeamStyles(api, teamId);
//         console.log(3)
//         const colors = stylesFormat(styles);
//         console.log(4)
//         const props = await apiGetFigmaFile(api, system);
//         console.log(5)
//         const formatedProps = fileFormat(props);
//         console.log(6)
//         const refencedColors = referenceColors(colors, formatedProps);
//         console.log(7)
//         const teamProjects = await apiGetFigmaTeamProjects(api, teamId);
//
//         console.log(8)
//         for (const project of teamProjects.projects) {
//             let projectFiles = await apiGetFigmaProjectFiles(api, project.id);
//
//             if (projectFiles && projectFiles.files.length) {
//                 for (const file of projectFiles.files) {
//                     let json = await apiGetFigmaFile(api, file.key)
//                     console.log(json)
//                     if (json) {
//                         let formatedJson = fileFormat(json, {
//                             project: {
//                                 key: file.key,
//                                 name: file.name,
//                                 last_modified: file.last_modified
//                             }
//                         });
//                         jsons.push(formatedJson);
//                     }
//                 }
//             }
//         }
//
//         console.log(9)
//         const colorUsage = jsonParser(jsons, refencedColors, colors);
//         console.log(10)
//         res.status(200).send(colorUsage)
//     } catch (err) {
//         console.log(err)
//         res.status(400).send({err});
//     }
// }
