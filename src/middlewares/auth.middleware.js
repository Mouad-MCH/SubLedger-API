import jwt from 'jsonwebtoken';
import { ENV } from '../../env.js';
import User from '../models/User.models.js';

export const authMiddlewares = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                success:false,
                message: "Token is missing"
            })
        }

        const token = authHeader.split(" ")[1];

        const dec = jwt.verify(token, ENV.KEY_SECRET);

        const user = await User.findById(dec.id).select("-password");

        if(!user) {
            return res.status(401).json({
                success:false,
                message: "User not found"
            })
        }

        req.user = user;
        next()

    }catch(err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}