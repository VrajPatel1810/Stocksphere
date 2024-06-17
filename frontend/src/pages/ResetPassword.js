import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const otp = location.state?.otp;

    const { newPassword, confirmNewPassword } = formData;

    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
        } else {
            dispatch(resetPassword({ email, otp, newPassword }));
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("Password reset successfully!");
            navigate('/login');
            dispatch(reset());
        }
    }, [isError, isSuccess, message, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            id="newPassword"
                            value={newPassword}
                            name="newPassword"
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            name="confirmNewPassword"
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button type='submit' className="btn reset-password-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
