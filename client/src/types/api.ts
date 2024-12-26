import { createAdminApi } from "../api/adminApi";
import { createUserApi } from "../api/userApi";

export type Remote = {
    get: (endpoint: string, headers?: HeadersInit) => Promise<any>;
    post: (endpoint: string, body?: any, headers?: HeadersInit) => Promise<any>;
    put: (endpoint: string, body: any, headers?: HeadersInit) => Promise<any>;
    del: (endpoint: string, body?: any, headers?: HeadersInit) => Promise<any>;
};

export interface IApiResponse<T> {
    data: T;
    message: string;
}

export type ApiContextType = {
    api: IApi;
    requestToken: string | null;
    setRequestToken: React.Dispatch<
        React.SetStateAction<string | null | undefined>
    >;
};

export interface IApi {
    userApi: ReturnType<typeof createUserApi>;
    adminApi: ReturnType<typeof createAdminApi>;
}

export interface IRegisterArgs {
    username: string;
    password: string;
    email: string;
}

export interface ILoginArgs {
    username: string;
    password: string;
}
