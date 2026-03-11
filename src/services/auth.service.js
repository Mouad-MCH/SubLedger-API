import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const createUserDB = async (data) => {
    try {

        const password = data.password;
        const newPassword = await bcrypt.hash(password, 10);

        data.password = newPassword;

        const user = await User.create(data);
        
        const token = generateToken(user.id)
        
        return {user, token}
    }catch(err) {
        throw err
    }
}
