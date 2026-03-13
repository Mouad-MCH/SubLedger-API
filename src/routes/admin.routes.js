import express from 'express';
import { authMiddlewares } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { getAllUsers } from '../controllers/admin.controller.js';
import { getAllSubscriptions } from '../controllers/subscription.controller.js';


const router = express.Router();

router.use(authMiddlewares)

router
   .get('/users', roleMiddleware('admin'), getAllUsers)
   .get('/subscriptions', roleMiddleware("admin"), getAllSubscriptions)



export default router