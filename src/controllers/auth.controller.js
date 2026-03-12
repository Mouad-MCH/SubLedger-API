import { createUserDB , loginUserDB} from "../services/auth.service.js"



export const createUser = async (req, res) => {
    try {

        const {user, token} = await createUserDB(req.body);

        res.status(200).json({
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

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const login = await loginUserDB(email, password);
        
        if(!login.success) {
            res.status(400).json({
                success: login.success,
                message: login.message
            })
        }

        res.status(200).json({
            success:true,
            message: login.message,
            token: login.token
        })

    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}