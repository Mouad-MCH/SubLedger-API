import mongoose from "mongoose";
import { ENV } from "../../env.js";


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DATABASE_URL);
        console.log(`Database is connected ${conn.connection.host}`)
    }catch(err) {
        console.error("Database not contected",err)
        throw err
    }
}