import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Current Path:', location.pathname);
        const token = localStorage.getItem('token');
        
        if (token) {
            setIsAuthenticated(true);
            
            // Only redirect if user is on login or signup pages
            if (location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/filters', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            
            // Only redirect if trying to access protected routes
            const protectedRoutes = ['/filters'];
            if (protectedRoutes.some(route => location.pathname.startsWith(route))) {
                navigate('/login', { replace: true });
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;