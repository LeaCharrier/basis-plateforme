import express from 'express';
import {get, push} from '../controllers/book.controller.js';

const router = express.Router();

router.post('/push', push);

export const bookRoutes = router;

router.get('', get);