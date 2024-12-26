import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useApi } from '../hooks/useApi';
import { useAppContext } from '../hooks/useAppContext';
import Colors from '../styles/colors';

interface NavbarProps {
    showDashboardButton?: boolean;
    showHomeButton?: boolean;
    showCreateUserButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
    const { setUser } = useActions();
    const { user } = useAppContext();
    const { api, setRequestToken } = useApi();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.userApi.logout();
            setUser(null);
            setRequestToken(null);
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <nav className="w-full p-4 bg-gray-800 flex justify-between items-center" style={{ backgroundColor: Colors.Background2 }}>
            <h1 className="text-white cursor-pointer" onClick={handleHome}>User Management System</h1>
            <div className="flex items-center">
                {user && props.showHomeButton && (
                    <span
                        className="text-white mr-4 cursor-pointer hover:text-gray-300"
                        onClick={handleHome}
                    >
                        {user.username}
                    </span>
                )}
                {user?.role === 'admin' && props.showDashboardButton && (
                    <button
                        onClick={handleDashboard}
                        className="p-2 bg-blue-500 text-white rounded mr-4"
                        style={{ backgroundColor: Colors.Primary2 }}
                    >
                        Dashboard
                    </button>
                )}
                {user?.role === 'admin' && props.showCreateUserButton && (
                    <button
                        onClick={() => navigate('/signup')}
                        className="p-2 bg-green-500 text-white rounded mr-4"
                        style={{ backgroundColor: Colors.Primary2 }}
                    >
                        Create User
                    </button>
                )}
                <button
                    onClick={handleLogout}
                    className="p-2 bg-red-500 text-white rounded"
                    style={{ backgroundColor: Colors.Danger }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;