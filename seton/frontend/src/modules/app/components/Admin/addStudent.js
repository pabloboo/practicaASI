import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

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
                body: JSON.stringify({ userName: studentData.userName, password: studentData.password,
                    firstName: studentData.firstName, lastName: studentData.lastName,
                    additionalNotes: studentData.additionalNotes}),
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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="userName"
                placeholder="Username"
                value={studentData.userName}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={studentData.password}
                onChange={handleChange}
            />
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={studentData.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={studentData.lastName}
                onChange={handleChange}
            />
            <textarea
                name="additionalNotes"
                placeholder="Additional notes"
                value={studentData.additionalNotes}
                onChange={handleChange}
                rows={4}
                cols={50}
            />
            <button type="submit">Create Student</button>
        </form>
    );
};

export default StudentForm;
