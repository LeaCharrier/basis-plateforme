import express from 'express';
import {
    get,
    getTeamProjects,
    getProjectFiles,
    getTeamProjectFilesByIndex,
    getFile,
    getFileByIndex,
    getTeamProjectFileByIndexes,
    push,
} from '../controllers/figma.controller.js';

const router = express.Router();

router.get('', get);

router.post('/push', push);

// Get Team Projects By TeamID
router.get('/team/:teamId/projects', getTeamProjects);

// Get Project Files By ProjectID
router.get('/team/:teamId/projects/:projectId/files', getProjectFiles);
router.get('/projects/:projectId/files', getProjectFiles);

// Get Team Project Files by index
router.get('/team/:teamId/projects/i/:projectIndex/files', getTeamProjectFilesByIndex);

// Get File By FileID
router.get('/team/:teamId/projects/:projectId/files/:fileId', getFile);
router.get('/projects/:projectId/files/:fileId', getFile);
router.get('/files/:fileId', getFile);

// Get Project File by index
router.get('/team/:teamId/projects/:projectId/files/i/:fileIndex', getFileByIndex);
router.get('/projects/:projectId/files/i/:fileIndex', getFileByIndex);

// Get Team Project File by indexes
router.get('/team/:teamId/projects/i/:projectIndex/files/i/:fileIndex', getTeamProjectFileByIndexes);

export default router;
