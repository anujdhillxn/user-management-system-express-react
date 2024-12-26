import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Navbar from '../components/Navbar';
import UserActions from '../components/UserActions';
import Colors from '../styles/colors';
import MyDetails from '../components/MyDetails';

const Home: React.FC = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();

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
            <Navbar showDashboardButton showHomeButton showCreateUserButton />
            <div className="flex p-4" style={{ backgroundColor: Colors.Background1, height: 'calc(100vh - 64px)' }}>
                <MyDetails />
                <UserActions user={user} />
            </div>
        </div>
    );
};

export default Home;