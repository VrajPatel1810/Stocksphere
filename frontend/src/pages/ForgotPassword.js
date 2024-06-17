import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestOtp, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("Password reset OTP sent successfully!");
            navigate('/verifyotp', { state: { email } });
            dispatch(reset());
        }
    }, [isError, isSuccess, message, dispatch, navigate, email]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(requestOtp({ email }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <button type='submit' className="btn forgot-password-btn">Request OTP</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
