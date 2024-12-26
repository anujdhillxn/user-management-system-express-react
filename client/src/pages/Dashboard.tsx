import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import Colors from '../styles/colors';
import { User } from '../types/context';
import UserActions from '../components/UserActions';
import Navbar from '../components/Navbar';
import UsersTable from '../components/UsersTable';
import { useAppContext } from '../hooks/useAppContext';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';

const Dashboard: React.FC = () => {
    const { api } = useApi();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { user } = useAppContext();
    const { setUser } = useActions();
    const navigate = useNavigate();
    const fetchUsers = async () => {
        try {
            const response = await api.adminApi.getAllUsers();
            setUsers(response.users);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateUser = async (updatedUser: User) => {
        try {
            const resp = await api.adminApi.updateUser(updatedUser.id, updatedUser);
            setUsers(users.map(user => (user.id === resp.user.id ? resp.user : user)));
            setSelectedUser(null);
            const me = await api.userApi.getProfile();
            setUser(me.user);
        }
        catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <div>Redirecting...</div>;
    }

    return (
        <div>
            <Navbar showHomeButton showCreateUserButton />
            <div className="flex p-4" style={{ backgroundColor: Colors.Background1, height: 'calc(100vh - 64px)' }}>
                <div className="w-1/2 p-4">
                    <div className="w-1/2 p-4">
                        <UsersTable users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} onUpdateUser={handleUpdateUser} />
                    </div>
                </div>
                <div className="w-1/2 p-4" style={{ backgroundColor: Colors.Background2 }}>
                    <h2 className="text-xl mb-4" style={{ color: Colors.Text1 }}>User Logs</h2>
                    {selectedUser ? <UserActions user={selectedUser} /> : (
                        <p style={{ color: Colors.Text2 }}>Select a user to view logs</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;