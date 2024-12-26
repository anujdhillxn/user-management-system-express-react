import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Colors from '../styles/colors';
import 'tailwindcss/tailwind.css';
import { useApi } from '../hooks/useApi';
import { useAppContext } from '../hooks/useAppContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { api, setRequestToken } = useApi();
    const { user } = useAppContext();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await api.userApi.login({ username, password });
            setRequestToken(resp.sessionToken);
        }
        catch (error) {
            alert(error);
        }
    };

    React.useEffect(() => {
        if (user) {
            navigate('/');
        };
    }, [user, navigate])

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen" style={{ backgroundColor: Colors.Background1 }}>
            <h1 className="text-2xl mb-6" style={{ color: Colors.Text1 }}>Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col w-80">
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2" style={{ color: Colors.Text2 }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2" style={{ color: Colors.Text2 }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                    />
                </div>
                <button
                    type="submit"
                    className="p-2 rounded cursor-pointer mb-4"
                    style={{ backgroundColor: Colors.Primary1, color: Colors.Text1 }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;