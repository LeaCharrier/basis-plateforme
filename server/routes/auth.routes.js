import express from 'express';
import {register, login, getUser} from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/Auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', AuthMiddleware, getUser);

export default router;
