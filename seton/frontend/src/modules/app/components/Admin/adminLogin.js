import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch('api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login - e.g., store authentication token in localStorage
                console.log('Login successful:', data);
                localStorage.setItem('token', data.serviceToken);
                navigate('/admin/home');
            } else {
                // Handle login error - e.g., display error message
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="App">
            <form action="" onSubmit={onSubmit}>
                <p>
                    <label htmlFor="username">Username: </label>
                    <input
                        name="username"
                        id="username"
                        value={username}
                        onChange={(ev) => setUsername(ev.currentTarget.value)}
                    />
                </p>
                <p>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                    />
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;