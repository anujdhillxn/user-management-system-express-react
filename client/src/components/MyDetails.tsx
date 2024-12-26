import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Colors from '../styles/colors';
import { useApi } from '../hooks/useApi';
import { useActions } from '../hooks/useActions';

const MyDetails: React.FC = () => {
    const { user } = useAppContext();
    const { setUser } = useActions();
    const { api, setRequestToken } = useApi();
    const navigate = useNavigate();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');

    useEffect(() => {
        setUsername(user?.username || '');
        setEmail(user?.email || '');
    }, [user]);

    const handleUpdate = async () => {
        try {
            const resp = await api.userApi.updateProfile({ username, email });
            setUser(resp.user);
            alert('Profile updated successfully');
        } catch (error) {
            alert(error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.userApi.deleteProfile();
            setUser(null);
            setRequestToken(null);
            navigate('/signup');
            alert('User deleted successfully');
        } catch (error) {
            alert(error);
        }
    };

    const isChanged = username !== user?.username || email !== user?.email;

    return (
        <div className="w-1/2 p-4">
            <h1 className="text-2xl mb-6" style={{ color: Colors.Text1 }}>Profile</h1>
            <div className="mb-4">
                <label htmlFor="username" className="block mb-2" style={{ color: Colors.Text2 }}>Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="w-full p-2 border rounded"
                    style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                />
            </div>
            <button
                onClick={handleUpdate}
                className={`p-2 rounded cursor-pointer ${isChanged ? '' : 'cursor-not-allowed'} mr-4`}
                style={{ color: Colors.Text1, backgroundColor: isChanged ? Colors.Primary1 : Colors.Text3 }}
                disabled={!isChanged}
            >
                Update
            </button>
            <button
                onClick={handleDelete}
                className="p-2 rounded cursor-pointer mt-4"
                style={{ color: Colors.Text1, backgroundColor: Colors.Danger }}
            >
                Delete Account
            </button>
        </div>
    );
};

export default MyDetails;