import mongoose, { Document } from "mongoose";
import { IUserData } from "../../../../entities/user.entities";

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            require: false,
            trim: true
        },
        country: {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        timestamps: true,
        description: "This schema defines the user model",
        version: 1,
        indexes: [{
            name: "email_unique",
            index: {
                email: 1
            },
            unique: true
        }]
    }
);

export default mongoose.model("user", userSchema);

export interface IUserDb extends Document, IUserData {
    createdAt: Date;
    updatedAt: Date;
}