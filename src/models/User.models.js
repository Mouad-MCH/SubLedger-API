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
        required: [true, "email is required"]
    },

    password: {
        type: String,
        required: true
    },

    role: String,
},
{
    timestamps: { createAt: true, updatedAt: true }
}
);


const User = mongoose.model("User", UserSchema);

export { User }
export default User;