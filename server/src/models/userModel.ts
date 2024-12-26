import mongoose, { Schema } from "mongoose";
import { IUser, IUserModel, UserRole } from "../types/models";
import { ActionType } from "../types/actions";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
        default: UserRole.USER,
    },
    actions: [
        {
            actionType: {
                type: String,
                enum: Object.values(ActionType),
                required: true,
            },
            actionDate: { type: Date, default: Date.now },
            actionDetails: {
                type: Schema.Types.Mixed,
                required: false,
            },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

// Create and export the User model
const User = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;
