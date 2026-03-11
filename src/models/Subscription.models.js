import mongoose from "mongoose";


const SubscriptionSchema = new mongoose.Schema({
    name: String,
    price: Number,
    billingCycle: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {createdAt: true, updatedAt: true}
})



const Subscription = mongoose.model("Subscription", SubscriptionSchema);


export { Subscription };
export default Subscription;

