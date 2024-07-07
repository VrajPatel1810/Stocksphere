import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStocks, sellStock, reset } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Portfolio.css';

function Portfolio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);

    const [sellQuantities, setSellQuantities] = useState({}); // Initialize as an empty object

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
        };
    }, [isError, message, user, dispatch, navigate]);

    const handleSellStock = (stockId, quantity) => {
        if (quantity >= 1 && quantity <= stocks.find(stock => stock._id === stockId).quantity) {
            dispatch(sellStock({ stockId, quantity }))
                .then(() => {
                    const stock = stocks.find(stock => stock._id === stockId);
                    const totalPrice = stock.price * quantity;
                    toast.success(`You have successfully sold ${quantity} units of ${stock.name} worth ₹${totalPrice}`);
                    // Clear sellQuantities for the sold stock
                    setSellQuantities({ ...sellQuantities, [stockId]: 0 });
                })
                .catch(error => {
                    toast.error(`Error: ${error.message}`);
                });
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="stocks-container">
            <Navbar />
            <div className="stocks-content">
                <h2>My Portfolio</h2>
                <div className="stocks-list">
                    {stocks.map((stock) => (
                        <div key={stock._id} className="stock-item">
                            <div className="stock-left">
                                <div className="stock-name">{stock.name}</div>
                            </div>
                            <div className="stock-right">
                                <div className="stock-price">Price: ₹{stock.price}</div>
                                <div className="stock-quantity">Quantity: {stock.quantity}</div>
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSellStock(stock._id, sellQuantities[stock._id]);
                                    }} 
                                    className="sell-stock-form"
                                >
                                    <label htmlFor={`quantity-${stock._id}`}>Sell Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${stock._id}`}
                                        value={sellQuantities[stock._id] || ''} // Bind to sellQuantities state
                                        onChange={(e) => setSellQuantities({ ...sellQuantities, [stock._id]: Math.max(0, Math.min(e.target.value, stock.quantity)) })}
                                        min="1"
                                        max={stock.quantity}
                                    />
                                    <button type="submit" className="btn">Sell</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default Portfolio;
