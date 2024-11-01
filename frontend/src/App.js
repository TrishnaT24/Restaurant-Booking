import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import RefrshHandler from './RefrshHandler';
import ResturantList from './filters';
import Login from './pages/Login';
import RestaurantPage from './RestaurantPage.js'; // Import RestaurantPage component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            navigate('/filters'); // Redirect to filters if already authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        setIsAuthenticated(false); // Update authentication state
        navigate('/login'); // Redirect to login
    };

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <div className="App">
            <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
            <button onClick={handleLogout}>Logout</button>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/filters' element={<PrivateRoute element={<ResturantList />} />} />
                <Route path='/restaurant/:name' element={<RestaurantPage />} /> 
                {/* Add route for RestaurantPage */}
            </Routes>
        </div>
    );
}

export default App;
