import express from "express";
import { authMiddlewares } from '../middlewares/auth.middleware.js'
import { createSubscription } from "../controllers/subscription.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddlewares)

router
   .post('/', roleMiddleware("user"),createSubscription)



export default router;