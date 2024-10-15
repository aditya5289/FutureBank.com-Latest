import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './LoginPage.css'; // Import custom CSS
import { login } from '../../redux/actions/authActions';

function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [localError, setLocalError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLocalError('');

        try {
            await dispatch(login(credentials));
            navigate('/dashboard');
        } catch (err) {
            setLocalError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-container card shadow">
                        <div className="card-body">
                            <h1 className="card-title text-center">Welcome to Future Bank</h1>
                            {(localError || error) && (
                                <div className="alert alert-danger" role="alert">
                                    {localError || (error && error.message)}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </button>
                                <div className="mt-3 text-center">
                                    <a href="#forgot" className="d-block">Forgot Password?</a>
                                    <button type="button" className="btn btn-link" onClick={() => navigate('/register')}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="security-tips mt-4">
                        <h3>Security Tips:</h3>
                        <ul>
                            <li>Do not share your username and password with anyone.</li>
                            <li>Always log out after completing your session.</li>
                            <li>Ensure your computer is protected with up-to-date antivirus software.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
