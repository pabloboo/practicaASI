import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const StudentForm = () => {
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        additionalNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/students/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: studentData.userName,
                    password: studentData.password,
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    additionalNotes: studentData.additionalNotes,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Student created:', data);
                navigate('/admin/home');
                alert('Estudiante creado correctamente');
            } else {
                // Handle errors, e.g., display an error message
                console.error('Failed to create student');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Username"
                        value={studentData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={studentData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={studentData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={studentData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="additionalNotes" className="form-label">
                        Additional notes
                    </label>
                    <textarea
                        className="form-control"
                        id="additionalNotes"
                        name="additionalNotes"
                        placeholder="Additional notes"
                        value={studentData.additionalNotes}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Student
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
