import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ENV } from "../../env.js";
import User from "../models/User.models.js";
import { generateToken } from "./generateToken.js";

const createAdim = async () => {
    try{
        await mongoose.connect(ENV.DATABASE_URL);

        const existeAdmin = await User.findOne({ email: "admin@subledger.com" });
        if(existeAdmin) {
            console.log("Admin is alredy exist");
            process.exit()
        }

        const password = await bcrypt.hash("admin123", 10);

        const admin = await User.create({
            name: "Admin",
            email: "admin@subledger.com",
            password,
            role: "admin"
        });

        const token = generateToken(admin.id)

        console.log("Admin is created", "token:" + token);

        process.exit();

    }catch(e) {
        console.error("Error", e);
        process.exit()
    }
}

createAdim();