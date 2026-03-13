import { createSubscriptionDB, deleteSubscriptionDB, getAllSubscriptionsByIdDB, getAllSubscriptionsDB, getSubscriptionDB, updateSubscriptionDB } from "../services/subscription.service.js"



export const createSubscription = async (req, res) => {
    try {
        const payload = {
            ...req.body,
            userId: req.user._id
        };

        const newSub = await createSubscriptionDB(payload);

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

export const getSubscription = async (req, res) => {
    try {

        const sub = await getSubscriptionDB(req.user._id);

        res.status(200).json({
            success: true,
            sub
        })
        
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const updateSubscription = async (req, res) => {
    const { id } = req.params
    try {
        const updatSub = await updateSubscriptionDB(req.user._id, id, req.body);

        res.status(200).json({
            success: true,
            updatSub
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deleteSubscription = async (req, res) => {
    const { id } = req.params
    try {
        const deletSub = await deleteSubscriptionDB(req.user._id, id);

        res.status(200).json({
            success: true,
            message: "subscription is deleted succsusfuly",
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getAllSubscriptions = async (req, res) => {
    try {
        const AllSub = await getAllSubscriptionsDB();

        res.status(200).json({
            success: true,
            message: "get all subscripteion",
            AllSub
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getAllSubscriptionsById = async (req, res) => {
    try{
        const allSub = await getAllSubscriptionsByIdDB(req.user._id);

        res.status(200).json({
            success: true,
            data: allSub
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}