import Subscription from "../models/Subscription.models.js";


export const createSubscriptionDB = async (data) => {
    try {
        const sub = await Subscription.create(data);

        return sub

    }catch(err) {
        throw err
    }
}

export const getSubscriptionDB = async (userId) => {
    try {
        const sub = await Subscription.find({ userId });

        return sub
    }catch(err) {
        throw err
    }
}

export const updateSubscriptionDB = async (userId, subId,  data) => {
    try {
        const sub = await Subscription.findOneAndUpdate({ userId, _id:subId }, data, { returnDocument: 'after' });

        return sub
    }catch(err) {
        throw err
    }
}

export const deleteSubscriptionDB = async (userId, subId) => {
    try {
        await Subscription.findOneAndDelete({ userId, _id: subId });
        return true
    }catch(err) {
        throw err
    }
}

export const getAllSubscriptionsDB = async () => {
    try {
        const subs = await Subscription.find({});
        return subs
    }catch(err) {
        throw err
    }
}

export const getAllSubscriptionsByIdDB = async (userId) => {
    try {

        const allSub = await Subscription.find({ userId });

        return allSub;

    }catch(err) {
        throw err
    }
}
