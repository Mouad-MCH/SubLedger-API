import jwt from 'jsonwebtoken';
import { ENV } from '../../env.js';


export const generateToken = (userId) => {
    return jwt.sign(
        {
            id:userId,
        },
        ENV.KEY_SECRET,
        {
            expiresIn: "7d"
        }
    )
}