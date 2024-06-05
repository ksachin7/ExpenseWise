import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Perform logout logic (e.g., clear authentication token, reset user state)

        // Redirect to the login page
        navigate('/signin');
    };

    // Call handleLogout when the component mounts (or when logout is triggered)
    React.useEffect(() => {
        handleLogout();
    }, []);

    return null;
};

export default Logout;
