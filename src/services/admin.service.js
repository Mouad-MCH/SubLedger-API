import User from "../models/User.models.js"



export const getAllUsersDB = async (req, res) => {
    try {
        const allUser = await User.find().select('-password')

        return allUser
    }catch(e) {
        throw e
    }
}

