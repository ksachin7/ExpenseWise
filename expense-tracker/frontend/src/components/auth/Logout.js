import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Perform logout logic (e.g., clear authentication token, reset user state)

        // Redirect to the login page
        navigate('/signin');
            // Perform logout actions (e.g., clear session, remove tokens)
            setIsLoggedIn(false);
    };

    // Call handleLogout when the component mounts (or when logout is triggered)
    React.useEffect(() => {
        handleLogout();
    }, []);

    return null;
};

export default Logout;
