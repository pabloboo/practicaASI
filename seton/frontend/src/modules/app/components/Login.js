import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {
            let endpoint = '';
            if (userType === 'student') {
                endpoint = 'api/users/loginStudent';
            } else {
                endpoint = 'api/users/loginTeacher'
            }
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                Promise.all([
                    localStorage.setItem('token', data.serviceToken),
                    localStorage.setItem('role', data.user.role)
                ]).then(async () => {
                    if (data.user.role === 'TEACHER') {
                        const responseGetTeacher = await fetch(`api/teachers/teacher/${data.user.id}`);
                        if (responseGetTeacher.ok) {
                            const dataGetTeacher = await responseGetTeacher.json();
                            Promise.all([
                                localStorage.setItem('userId', dataGetTeacher.id)
                            ])
                        }
                        navigate('/teacher/home');
                    } else if (data.user.role === 'STUDENT') {
                        navigate('/student/home');
                    }
                });
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

                        <div className="mt-2 text-center">
                            <label className="ml-3">
                                <input
                                    type="radio"
                                    value="student"
                                    checked={userType === 'student'}
                                    onChange={() => setUserType('student')}
                                />
                                Estudiante
                            </label>
                        </div>
                        <div className="mt-2 text-center">
                            <label>
                                <input
                                    type="radio"
                                    value="teacher"
                                    checked={userType === 'teacher'}
                                    onChange={() => setUserType('teacher')}
                                />
                                Profesor
                            </label>
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
