import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../middlewares/validators.js';
import { createUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();


router
   .post('/register', validateRequest(registerSchema), createUser)
   .post('/login', validateRequest(loginSchema), loginUser)


export default router;