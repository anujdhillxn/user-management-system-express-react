import React from "react";
import { ApiContext } from "../hooks/useApi";
import useRemote from "../hooks/useRemote";
import { createApi } from "./createApi";

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [requestToken, setRequestToken] = React.useState<string | null | undefined>(undefined);
    const baseUrl = import.meta.env.API_BASE_URL || "http://localhost:5000/api/";
    const fetchToken = async () => {
        const token = localStorage.getItem("requestToken");
        setRequestToken(token);
    };

    React.useEffect(() => {
        fetchToken();
    }, []);

    const remote = useRemote(requestToken, baseUrl);
    const api = createApi(remote);

    if (requestToken === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <ApiContext.Provider value={{ api, requestToken, setRequestToken }}>
            {children}
        </ApiContext.Provider>
    );
};