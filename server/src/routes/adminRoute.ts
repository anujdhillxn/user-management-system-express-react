import { Router } from "express";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from "../middlewares/validationMiddleware";
import {
    createUserEndpoint,
    deleteUserByIdEndpoint,
    getAllUsersEndpoint,
    updateUserByIdEndpoint,
} from "../controllers/adminController";

const adminRoutes = Router();

adminRoutes.use(authenticateToken, isAdmin);

adminRoutes.get("/", getAllUsersEndpoint);
adminRoutes.put(
    "/:id",
    validateEmail,
    validateUsername,
    updateUserByIdEndpoint
);
adminRoutes.post(
    "/",
    validateEmail,
    validatePassword,
    validateUsername,
    createUserEndpoint
);
adminRoutes.delete("/:id", deleteUserByIdEndpoint);

export default adminRoutes;
