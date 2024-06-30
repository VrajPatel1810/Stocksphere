// Navbar.js
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Navbar() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
      };

    return (
        <div className="navbar">
            <div className="logo">StockSphere</div>
            <div className="nav-links">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>My Portfolio</Link>
                <Link to="/stocks" className={`nav-link ${location.pathname === '/stocks' ? 'active' : ''}`}>Stocks</Link>
            </div>
            <div className="logout-button">
                <button className="btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar;