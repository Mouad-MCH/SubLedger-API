import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { registerSchema } from '../middlewares/validators.js';
import { createUser } from '../controllers/auth.controller.js';

const router = express.Router();


router
   .post('/register', validateRequest(registerSchema), createUser)
   .post('/login')


export default router;