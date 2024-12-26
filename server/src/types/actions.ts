import { ObjectId } from "mongoose";

export enum ActionType {
    CREATE_SELF = "CREATE_SELF",
    READ_SELF = "READ_SELF",
    UPDATE_SELF = "UPDATE_SELF",
    DELETE_SELF = "DELETE_SELF",
    CREATE_OTHERS = "CREATE_OTHERS",
    READ_OTHERS = "READ_OTHERS",
    UPDATE_OTHERS = "UPDATE_OTHERS",
    DELETE_OTHERS = "DELETE_OTHERS",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export type Action = {
    actionType: ActionType;
    actionDate: Date;
    actionDetails:
        | undefined
        | ActionCreateOtherType
        | ActionUpdateOtherType
        | ActionDeleteOtherType
        | ActionUpdateSelfType
        | ActionLoginType
        | ActionLogoutType;
};

export type ActionCreateOtherType = {
    createdUserId: string;
};

export type ActionUpdateSelfType = {
    updatedFields: Record<string, string>;
};

export type ActionUpdateOtherType = {
    updatedUserId: string;
    updatedFields: Record<string, string>;
};

export type ActionDeleteOtherType = {
    deletedUserId: string;
};

export type ActionLoginType = {
    ipAddress: string;
    device: string;
};

export type ActionLogoutType = {
    ipAddress: string;
    device: string;
};
