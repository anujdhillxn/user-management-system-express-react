import React from 'react';
import { useApi } from '../hooks/useApi';
import { User } from '../types/context';
export type AppContextProps = {
    user: User | null;
};

export type AppActionsProps = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AppContext = React.createContext<AppContextProps | undefined>(
    undefined
);

export const AppActions = React.createContext<AppActionsProps | undefined>(
    undefined
);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const { api, requestToken } = useApi();

    const fetchUser = async () => {
        try {
            const resp = await api.userApi.getProfile();
            setUser(resp.user);
        }
        catch (err) {
            localStorage.removeItem('requestToken');
        }
    }

    React.useEffect(() => {
        if (requestToken) {
            localStorage.setItem('requestToken', requestToken);
            fetchUser();
        }
        else {
            localStorage.removeItem('requestToken');
        }
    }, [requestToken]);

    return <AppContext.Provider value={{ user }}>
        <AppActions.Provider value={{ setUser }}>
            {children}
        </AppActions.Provider>
    </AppContext.Provider>

}