import { NextFunction, Request, Response } from "express";

export const validateUsername = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { username } = req.body;
    console.log(req.body);
    try {
        validateUsernameOrThrow(username);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
        return;
    }
};

export const validatePassword = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { password } = req.body;
    try {
        validatePasswordOrThrow(password);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
        return;
    }
};

export const validateEmail = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { email } = req.body;
    try {
        validateEmailOrThrow(email);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
        return;
    }
};

export const validateUsernameOrThrow = (username: string): void => {
    if (!username || !/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error(
            "Username must be alphanumeric with only underscores allowed"
        );
    }
};

export const validatePasswordOrThrow = (password: string): void => {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
};

export const validateEmailOrThrow = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("Invalid email address");
    }
};
