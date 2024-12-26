import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useAppContext } from '../hooks/useAppContext';
import Colors from '../styles/colors';
import Navbar from '../components/Navbar';
import { UserRole } from '../types/context';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.USER);

    const { api } = useApi();
    const { user } = useAppContext();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.adminApi.createUser(username, password, role, email);
            alert('User created successfully');
            navigate('/dashboard');
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div style={{ overflow: 'hidden' }}>
            <Navbar showHomeButton={true} showDashboardButton />
            <div className="flex flex-col items-center justify-center h-screen w-screen" style={{ backgroundColor: Colors.Background1 }}>
                <h1 className="text-2xl mb-6" style={{ color: Colors.Text1 }}>Create User</h1>
                <form onSubmit={handleSignup} className="flex flex-col w-80">
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
                        <label htmlFor="email" className="block mb-2" style={{ color: Colors.Text2 }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="mb-4">
                        <label htmlFor="role" className="block mb-2" style={{ color: Colors.Text2 }}>Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                            className="w-full p-2 border rounded"
                            style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="p-2 rounded cursor-pointer mb-4"
                        style={{ backgroundColor: Colors.Primary1, color: Colors.Text1 }}
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;