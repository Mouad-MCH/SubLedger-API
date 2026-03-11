import { success } from "zod"
import { createUserDB } from "../services/auth.service.js"


export const createUser = async (req, res) => {
    try {

        const {user, token} = await createUserDB(req.body);

        res.status(500).json({
            success: true,
            message: "user registred",
            user,
            token
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}