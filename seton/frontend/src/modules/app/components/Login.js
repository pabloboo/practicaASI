import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import { Link } from "react-router-dom";

const Login = () => {

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
                console.log('Login successful:', data);
                localStorage.setItem('token', data.serviceToken);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card bg-light border-dark">
                <h5 className="card-header text-center">
                    <label>Login</label>
                </h5>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group text-center">
                            <label htmlFor="username">Username</label>
                            <div className="col-md-4 mx-auto">
                                <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(ev) => setUsername(ev.currentTarget.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group text-center">
                            <label htmlFor="password" className="mx-auto">Password</label>
                            <div className="col-md-4 mx-auto">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group text-center">
                            <div className="mt-2">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
