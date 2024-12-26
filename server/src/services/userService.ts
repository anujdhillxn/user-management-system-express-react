import User from "../models/userModel";
import { IUser, IToken, IUserSafe, UserRole } from "../types/models";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Token from "../models/tokenModel";
import mongoose from "mongoose";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    try {
        const {
            username = "",
            email = "",
            password = "",
            role = UserRole.USER,
        } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role,
            actions: [],
            createdAt: new Date(),
        });
        await newUser.save();
        return newUser;
    } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const loginUser = async (
    username: string,
    password: string,
    ipAddress: string,
    device: string
): Promise<string> => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const sessionToken = await createSessionToken(user._id);
        await sessionToken.save();
        await user.save();
        return sessionToken.token;
    } catch (error: any) {
        throw new Error(`Error logging in user: ${error.message}`);
    }
};

export const logoutUser = async (
    user: IUser,
    ipAddress: string,
    device: string
): Promise<void> => {
    try {
        await Token.deleteOne({ userId: user._id });
    } catch (error: any) {
        throw new Error(`Error logging out user: ${error.message}`);
    }
};

export const findUserByToken = async (token: string): Promise<IUser> => {
    try {
        const tokenDoc = await Token.findOne({ token });
        if (!tokenDoc) {
            throw new Error("Token not found");
        }

        const user = await User.findOne({
            _id: tokenDoc.userId,
            isActive: true,
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error: any) {
        throw new Error(`Error retrieving user: ${error.message}`);
    }
};

export const getUserById = async (userId: string): Promise<IUser> => {
    try {
        const user = await User.findOne({ _id: userId, isActive: true });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error: any) {
        throw new Error(`Error retrieving user: ${error.message}`);
    }
};

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const users = await User.find({ isActive: true });
        return users;
    } catch (error: any) {
        throw new Error(`Error retrieving users: ${error.message}`);
    }
};

interface IUpdateUserRes {
    updatedUser: IUser;
    updatedFields: { email?: string; username?: string; role?: string };
}
export const updateUser = async (
    user: IUser,
    updateData: Partial<IUser>
): Promise<IUpdateUserRes> => {
    try {
        const updatedFields: Record<string, string> = {};
        if (updateData.username && updateData.username !== user.username) {
            user.username = updateData.username;
            updatedFields["username"] = updateData.username;
        }

        if (updateData.email && updateData.email !== user.email) {
            user.email = updateData.email;
            updatedFields["email"] = updateData.email;
        }
        if (updateData.role && updateData.role !== user.role) {
            user.role = updateData.role;
            updatedFields["role"] = updateData.role;
        }
        await user.save();
        return { updatedUser: user, updatedFields };
    } catch (error: any) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

export const deleteUser = async (user: IUser): Promise<IUser> => {
    try {
        user.isActive = false;
        await user.save();
        return user;
    } catch (error: any) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

const createSessionToken = async (
    userId: mongoose.Types.ObjectId
): Promise<IToken> => {
    try {
        const token = crypto.randomBytes(64).toString("hex");
        return new Token({ userId, token, createdAt: new Date() });
    } catch (error: any) {
        throw new Error(`Error creating session token: ${error.message}`);
    }
};

export const sanitiseUser = (user: IUser): IUserSafe => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        actions: user.actions,
    };
};
