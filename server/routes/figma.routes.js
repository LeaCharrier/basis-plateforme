import express from 'express';
import {
    get,
    getTeamProjects,
    getTeamProjectsPub,
    getTeamProjectsFiles,
    getTeamProjectsFilesPub,
    getProjectFiles,
    getTeamProjectFilesByIndex,
    getFile,
    getFilePub,
    getFileByIndex,
    getTeamProjectFileByIndexes,
    getTeamStyles,
    getColorAnalysis,
    getColorAnalysisPub,
    push,
    test,
    getTeamFiles,
} from '../controllers/figma.controller.js';
import AuthMiddleware from "../middleware/Auth.js"

const router = express.Router();

router.get('', AuthMiddleware, get);

router.post('/push', AuthMiddleware, push);

// Get Team Projects By TeamID
router.get('/team/:teamId/projects', AuthMiddleware, getTeamProjects);
router.post('/team/:teamId/projects', getTeamProjectsPub);

// Get Team Projects and Files By TeamID
router.get('/team/:teamId/projects/files', AuthMiddleware, getTeamProjectsFiles);
router.post('/team/:teamId/projects/files', getTeamProjectsFilesPub);
router.get('/team/:teamId/files', AuthMiddleware, getTeamFiles);

// Get Project Files By ProjectID
router.get('/team/:teamId/projects/:projectId/files', AuthMiddleware, getProjectFiles);
router.get('/projects/:projectId/files', AuthMiddleware, getProjectFiles);

// Get Team Project Files by index
router.get('/team/:teamId/projects/i/:projectIndex/files', AuthMiddleware, getTeamProjectFilesByIndex);

// Get File By FileID
router.get('/team/:teamId/projects/:projectId/files/:fileId', AuthMiddleware, getFile);
router.get('/projects/:projectId/files/:fileId', AuthMiddleware, getFile);
router.get('/files/:fileId', AuthMiddleware, getFile);
router.post('/files/:fileId', getFilePub);

// Get Project File by index
router.get('/team/:teamId/projects/:projectId/files/i/:fileIndex', AuthMiddleware, getFileByIndex);
router.get('/projects/:projectId/files/i/:fileIndex', AuthMiddleware, getFileByIndex);

// Get Team Project File by indexes
router.get('/team/:teamId/projects/i/:projectIndex/files/i/:fileIndex', AuthMiddleware, getTeamProjectFileByIndexes);

// Get Team Styles
router.get('/team/:teamId/styles', AuthMiddleware, getTeamStyles);

// Get Color Analysis
router.get('/team/:teamId/colors', AuthMiddleware, getColorAnalysis);
router.post('/team/:teamId/colors', getColorAnalysisPub);

// TEST ROUTE ANLY FOR DEV PURPOSES
router.post('/test', AuthMiddleware, test);


export default router;
