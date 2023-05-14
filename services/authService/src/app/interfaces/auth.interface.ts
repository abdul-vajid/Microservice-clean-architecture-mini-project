import mongoose, { Document } from 'mongoose';

export interface authDb extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface userData {
    email: string;
    password: string;
}