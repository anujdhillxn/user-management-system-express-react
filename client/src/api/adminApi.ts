import { Remote } from "../types/api";
import { User, UserRole } from "../types/context";

export const createAdminApi = (remote: Remote) => {
    const { get, put, del, post } = remote;
    const getAllUsers = () => {
        return get("admin/");
    };
    const deleteUser = (userId: string) => {
        return del(`admin/${userId}`);
    };
    const updateUser = (userId: string, userData: Partial<User>) => {
        return put(`admin/${userId}`, userData);
    };
    const createUser = (
        username: string,
        password: string,
        role: UserRole,
        email: string
    ) => {
        return post("admin/", { username, password, role, email });
    };
    return {
        getAllUsers,
        deleteUser,
        updateUser,
        createUser,
    };
};
