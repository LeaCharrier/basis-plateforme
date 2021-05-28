import express from 'express';
import {
    create,
    createStatus,
    getById,
    getList,
    getStatusById,
    getStatusBySlug,
    getStatusList,
    update
} from "../controllers/issues.controller.js";

const router = express.Router();

// Get Issues List by teamId
router.get('/list/:teamId', getList);

// Get Issue by Id
router.get('/issue/:id', getById);

// Create Issue
router.post('/issue/create', create);

// Update Issue by Id
router.put('/issue/:id/update', update);

// Create Custom Status
// router.post('/status/create', createStatus);

// Get Issues by status ID
router.get('/status/list', getStatusList);

// Get Issues by status ID
router.get('/status/:id', getStatusById);

// Get Issues by status ID
router.get('/status/slug/:slug', getStatusBySlug);

export default router;
