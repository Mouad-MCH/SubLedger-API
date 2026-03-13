import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../middlewares/validators.js';
import { createUser, getPorfile, loginUser } from '../controllers/auth.controller.js';
import { authMiddlewares } from '../middlewares/auth.middleware.js';

const router = express.Router();


router
   .post('/register', validateRequest(registerSchema), createUser)
   .post('/login', validateRequest(loginSchema), loginUser)
   .get('/profile', authMiddlewares, getPorfile)


export default router;