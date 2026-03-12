import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const createUserDB = async (data) => {
    try {

        const exist = await User.findOne({email: data.email});

        if(exist) {
            const error = new Error("email is already exist");
            throw error
        }



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


export const loginUserDB = async (email, password) => {
    try {

        const e = await User.findOne({email});
        console.log(e)

        if(!e) {
            return {success: false, message: "password or emali is invaled"}
        }

        const validePassword = await bcrypt.compare(password, e.password)

        if(!validePassword) {
            return {success: false, message: "password or emali is invaled"}
        }


        const token = generateToken(e.id);

        return {success: true, message: "user is logged" , token}

    }catch(err) {
        throw err
    }
}