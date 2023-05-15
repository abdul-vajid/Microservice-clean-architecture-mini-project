import mongoose, { Document } from "mongoose";
import { IUserData } from "../../../../entities/auth.entities";

const authSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
        description: "This schema defines the authentication model",
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

export default mongoose.model("authentication", authSchema);

export interface IAuthDb extends Document, IUserData{
    createdAt: Date;
    updatedAt: Date;
}