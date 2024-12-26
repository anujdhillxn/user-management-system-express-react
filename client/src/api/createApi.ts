import { IApi, Remote } from "../types/api";
import { createAdminApi } from "./adminApi";
import { createUserApi } from "./userApi";

export const createApi = (remote: Remote): IApi => {
    const userApi = createUserApi(remote);
    const adminApi = createAdminApi(remote);
    return { userApi, adminApi };
};
