import express from 'express';
import {get, push} from '../controllers/jsonFigma.controller.js';

const router = express.Router();

router.post('/push', push);

export const jsonFigma = router;

router.get('', get);