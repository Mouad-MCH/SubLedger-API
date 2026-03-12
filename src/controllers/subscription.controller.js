import { createSubscriptionDB } from "../services/subscription.service.js"



export const createSubscription = async (req, res) => {
    try {
        const newSub = await createSubscriptionDB(req.body);

        res.status(201).json({
            success: true,
            message: "Subscription is created",
            sub: newSub
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}