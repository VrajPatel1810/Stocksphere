import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stocks.css'; // Reuse the same CSS for consistency
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { getStocks, reset } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';

function Portfolio() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector(state => state.auth);
    const { stocks, isLoading, isError, message } = useSelector(state => state.stocks);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getStocks());

        return () => {
            dispatch(reset());
        }
    }, [isError, message, user, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <div className="stocks-container">
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
            <div className="stocks-content">
                <h2>My Portfolio</h2>
                <div className="stocks-list">
                    {stocks.map(stock => (
                            <div key={stock.symbol} className="stock-item">
                                <div className="stock-left">
                                    <div className="stock-name">{stock.description}</div>
                                </div>
                                <div className="stock-right">
                                    <div className="stock-price">Price: ${stock.price}</div>
                                    <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
                                        1D: {stock.changePercent}%
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
