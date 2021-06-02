import express from 'express';
import {register, login, getUser, update, getTeamUser} from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/Auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', AuthMiddleware, getUser);
router.get('/team/:teamId', getTeamUser);
router.put('/update', AuthMiddleware, update);

export default router;
