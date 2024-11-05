import './InlineMenu.css';
import { Link, useNavigate } from 'react-router-dom';
function InlineMenu({setShowAppH,setShowMymap}) {
    const navigate = useNavigate();

    // Handle click to navigate to /signup
    const handleBookTableClick = () => {
        setShowAppH(false);
        navigate('/signup');
    };
    const handleMapClick = () => {
        setShowAppH(true);
        setShowMymap(false);
        navigate('/map');
    };

    return (
        <nav className="inline-menu">
            <ul>
                <li>
                    <Link to="/"><button>Home</button></Link>
                </li>
                <li>
                    <Link to="/about"><button>About</button></Link>
                </li>
                <li>
                {/* <Link to="/map"><button>Map</button></Link> */}
                <button onClick={handleMapClick}>Map</button>
                </li>
                <li>
                    <button onClick={handleBookTableClick}>Book a Table</button> {/* Use onClick handler */}
                </li>
            </ul>
        </nav>
    );
}

export default InlineMenu;
