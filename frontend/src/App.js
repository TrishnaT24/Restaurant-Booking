import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
//import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import RefrshHandler from './RefrshHandler';
import RestaurantList from './filters';
import Login from './pages/Login';
import RestaurantPage from './RestaurantPage';
import AppH from './srcH/AppH'; // Import AppH component
import Mymap from './srcH/Mymap';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAppH, setShowAppH] = useState(true); // State to control AppH display
    const [showMymap, setShowMymap] = useState(true); // State to control AppH display

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const PrivateRoute = ({ children }) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    //Conditionally render AppH at the start
    if (showAppH) {
        return <AppH setShowAppH={setShowAppH} setShowMymap={setShowMymap}/>; // Pass onProceed to close AppH
    }
    if (showMymap) {
        return <Mymap setShowMymap={setShowMymap}/>; // Pass onProceed to close AppH
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
            {isAuthenticated && (
                <button 
                    onClick={handleLogout}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'goldenrod',
                        color: 'black',
                        borderRadius: '0.25rem'
                    }}
                    // className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            )}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/map" element={<Mymap />} />
                <Route 
                    path="/filters" 
                    element={
                        <PrivateRoute>
                            <RestaurantList />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/restaurant/:name" 
                    element={
                        <PrivateRoute>
                            <RestaurantPage />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;
