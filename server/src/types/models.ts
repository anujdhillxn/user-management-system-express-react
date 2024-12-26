import { Document, Model, ObjectId } from "mongoose";
import { Action } from "./actions";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    actions: Action[];
    createdAt: Date;
    isActive: boolean;
}

export interface IUserSafe {
    id: ObjectId;
    username: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    actions: Action[];
}

export interface IUserModel extends Model<IUser> {}

export interface IToken extends Document {
    userId: ObjectId;
    token: string;
    createdAt: Date;
}

export interface ITokenModel extends Model<IToken> {}
