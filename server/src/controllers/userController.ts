import { Request, Response } from "express";
import {
    deleteUser,
    findUserByToken,
    loginUser,
    logoutUser,
    sanitiseUser,
    updateUser,
} from "../services/userService";
import { ActionType } from "../types/actions";

export const loginUserEndpoint = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const ipAddress = req.ip;
        const device = req.headers["user-agent"] || "";
        const sessionToken = await loginUser(
            username,
            password,
            ipAddress,
            device
        );
        const user = await findUserByToken(sessionToken);
        user.actions.push({
            actionType: ActionType.LOGIN,
            actionDate: new Date(),
            actionDetails: { ipAddress, device },
        });
        await user.save();
        res.status(200).json({ sessionToken });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const logoutUserEndpoint = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const ipAddress = req.ip;
        const device = req.headers["user-agent"] || "";
        await logoutUser(user, ipAddress, device);
        user.actions.push({
            actionType: ActionType.LOGOUT,
            actionDate: new Date(),
            actionDetails: { ipAddress, device },
        });
        await user.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getProfileEndpoint = async (req: Request, res: Response) => {
    try {
        const user = sanitiseUser(req.user!);
        res.status(200).json({ user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProfileEndpoint = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const { username, email } = req.body;
        const { updatedUser, updatedFields } = await updateUser(user, {
            username,
            email,
        });
        updatedUser.actions.push({
            actionType: ActionType.UPDATE_SELF,
            actionDate: new Date(),
            actionDetails: { updatedFields },
        });
        await updatedUser.save();
        res.status(200).json({ user: sanitiseUser(updatedUser) });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProfileEndpoint = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        await deleteUser(user);
        user.actions.push({
            actionType: ActionType.DELETE_SELF,
            actionDate: new Date(),
            actionDetails: undefined,
        });
        await user.save();
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
