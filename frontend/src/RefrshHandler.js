import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantPage from './RestaurantPage';
function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated via token in local storage
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true); // Update authentication state

            // Redirect the user to filters if they are trying to access login or signup
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup') {
                navigate('/filters', { replace:true }); // Redirect to filters page
            }
            else if (location.pathname === '/restaurant/yorokobi') {
                navigate('/restaurant/yorokobi', { replace: true }); // Stay on the RestaurantPage
            }
        } else {
            // If no token, ensure that unauthenticated users cannot access protected routes
            if (location.pathname === '/filters') {
                navigate('/login', { replace: true }); // Redirect to login if they try to access filters
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null; // No UI elements to render
}

export default RefrshHandler;
