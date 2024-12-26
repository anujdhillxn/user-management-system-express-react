import { useCallback } from "react";
import { Remote } from "../types/api";

interface RequestOptions {
    method: string;
    headers?: HeadersInit;
    body?: any;
}

const useRemote = (
    requestToken: string | null | undefined,
    baseUrl: string
): Remote => {
    const request = useCallback(
        async (endpoint: string, options: RequestOptions) => {
            const headers = new Headers(options.headers);
            if (requestToken) {
                headers.set("Authorization", `Bearer ${requestToken}`);
            }
            headers.set("Content-Type", "application/json");
            const response = await fetch(`${baseUrl}${endpoint}`, {
                ...options,
                headers,
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (!response.ok) {
                throw new Error(data.error || "Something went wrong!");
            }
            return data;
        },
        [baseUrl, requestToken]
    );

    const get = useCallback(
        (endpoint: string, headers?: HeadersInit) => {
            return request(endpoint, { method: "GET", headers });
        },
        [request]
    );

    const post = useCallback(
        (endpoint: string, body: any, headers?: HeadersInit) => {
            return request(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body),
            });
        },
        [request]
    );

    const put = useCallback(
        (endpoint: string, body: any, headers?: HeadersInit) => {
            return request(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body),
            });
        },
        [request]
    );

    const del = useCallback(
        (endpoint: string, body: any, headers?: HeadersInit) => {
            return request(endpoint, {
                method: "DELETE",
                headers,
                body: JSON.stringify(body),
            });
        },
        [request]
    );

    return { get, post, put, del };
};

export default useRemote;
