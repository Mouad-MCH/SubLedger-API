import { getAllUsersDB } from "../services/admin.service.js"


export const getAllUsers = async (req, res) => {
    try {
        const allUser = await getAllUsersDB();

        res.status(200).json({
            success:true,
            message: "All users",
            allUser
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}