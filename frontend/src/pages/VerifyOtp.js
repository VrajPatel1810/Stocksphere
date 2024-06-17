import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyOtp, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import './VerifyOtp.css';

function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const email = location.state?.email;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyOtp({ email, otp }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("OTP verified successfully!");
            navigate('/resetpassword', { state: { email, otp } });
            dispatch(reset());
        }
    }, [isError, isSuccess, message, dispatch, navigate, email, otp]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="verify-otp-container">
            <div className="verify-otp-box">
                <h2>Verify OTP</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="OTP"
                            id="otp"
                            value={otp}
                            name="otp"
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <button type='submit' className="btn verify-otp-btn">Verify OTP</button>
                </form>
            </div>
        </div>
    );
}

export default VerifyOTP;
