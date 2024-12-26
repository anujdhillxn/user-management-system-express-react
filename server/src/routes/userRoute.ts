import { Router } from "express";
import {
    deleteProfileEndpoint,
    getProfileEndpoint,
    loginUserEndpoint,
    logoutUserEndpoint,
    updateProfileEndpoint,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
    validateEmail,
    validateUsername,
} from "../middlewares/validationMiddleware";

const userRoutes = Router();

userRoutes.post("/login", loginUserEndpoint);
userRoutes.post("/logout", authenticateToken, logoutUserEndpoint);
userRoutes.get("/profile", authenticateToken, getProfileEndpoint);
userRoutes.put(
    "/profile",
    authenticateToken,
    validateEmail,
    validateUsername,
    updateProfileEndpoint
);
userRoutes.delete("/profile", authenticateToken, deleteProfileEndpoint);

export default userRoutes;
