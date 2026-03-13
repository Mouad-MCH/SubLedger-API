import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const subscriptionSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().min(1).required(),
    billingCycle: Joi.string().required(),
})

