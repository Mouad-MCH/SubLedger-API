import express from "express";
import { authMiddlewares } from '../middlewares/auth.middleware.js'
import { createSubscription, deleteSubscription, getAllSubscriptions, getAllSubscriptionsById, getSubscription, updateSubscription } from "../controllers/subscription.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { subscriptionSchema } from "../middlewares/validators.js";

const router = express.Router();

router.use(authMiddlewares)

router
   .post('/', validateRequest(subscriptionSchema), roleMiddleware("user"),createSubscription)
   .get('/:id', roleMiddleware("user"), getSubscription)
   .get('/', roleMiddleware("user"), getAllSubscriptionsById)
   .put('/:id', roleMiddleware("user"), updateSubscription)
   .delete('/:id', roleMiddleware("user"), deleteSubscription)

export default router;