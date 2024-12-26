import { Request, Response } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    sanitiseUser,
    updateUser,
} from "../services/userService";
import { ActionType } from "../types/actions";

export const getAllUsersEndpoint = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users: users.map(sanitiseUser) });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUserByIdEndpoint = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const me = req.user!;
        const user = await getUserById(id);
        const { updatedUser, updatedFields } = await updateUser(user, req.body);
        me.actions.push({
            actionType: ActionType.UPDATE_OTHERS,
            actionDate: new Date(),
            actionDetails: { updatedFields, updatedUserId: id },
        });
        await me.save();
        res.status(200).json({ user: sanitiseUser(updatedUser) });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUserByIdEndpoint = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const me = req.user!;
        const user = await getUserById(id);
        await deleteUser(user);
        me.actions.push({
            actionType: ActionType.DELETE_OTHERS,
            actionDate: new Date(),
            actionDetails: { deletedUserId: id },
        });
        await me.save();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const createUserEndpoint = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const createdUser = await createUser(req.body);
        user.actions.push({
            actionType: ActionType.CREATE_OTHERS,
            actionDate: new Date(),
            actionDetails: { createdUserId: createdUser._id },
        });
        await user.save();
        res.status(201).json({ user: sanitiseUser(createdUser) });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
