import Subscription from "../models/Subscription.models.js";


export const createSubscriptionDB = async (data) => {
    try {
        const sub = await Subscription.create(data);

        return sub

    }catch(err) {
        throw err
    }
}

