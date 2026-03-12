import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        minLength: 4
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
},
{
    timestamps: { createAt: true, updatedAt: true }
}
);


const User = mongoose.model("User", UserSchema);

export { User }
export default User;