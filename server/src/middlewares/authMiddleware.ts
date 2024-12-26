import e, { Request, Response, NextFunction } from "express";
import { findUserByToken } from "../services/userService";
import { UserRole } from "../types/models";

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Authentication token is missing");
        }

        const user = await findUserByToken(token);
        if (!user) {
            throw new Error("Invalid token");
        }

        req.user = user;
        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user!;
        if (!(user.role === UserRole.ADMIN)) {
            throw new Error("User is not an admin");
        }
        next();
    } catch (error: any) {
        res.status(403).json({ error: error.message });
    }
};
