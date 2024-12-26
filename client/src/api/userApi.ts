import { ILoginArgs, Remote } from "../types/api";
import { User } from "../types/context";

export const createUserApi = (remote: Remote) => {
    const { get, post, put, del } = remote;

    const login = (credentials: ILoginArgs) => {
        return post("users/login", credentials);
    };

    const logout = () => {
        return post("users/logout");
    };

    const deleteProfile = () => {
        return del("users/profile");
    };

    const getProfile = () => {
        return get("users/profile");
    };

    const updateProfile = (userData: Partial<User>) => {
        return put("users/profile", userData);
    };

    return {
        login,
        logout,
        getProfile,
        updateProfile,
        deleteProfile,
    };
};
