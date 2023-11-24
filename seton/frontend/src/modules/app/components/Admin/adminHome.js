import React from 'react';
import {useNavigate} from "react-router-dom";

const AdminHome = () => {
    const navigate = useNavigate();

    const handleButtonClick = (buttonName) => {
        // Logic for handling button clicks
        console.log(`Button "${buttonName}" clicked`);
        const token = localStorage.getItem('token'); // Retrieve token from storage
        console.log(token)
        // You can add logic to perform actions based on the button clicked
    };

    const handleCrearUsuario = () => {
        navigate('/admin/registerUser')
    };

    return (
        <div>
            <h1>Welcome to Admin Home Page</h1>
            <div>
                <button onClick={() => handleCrearUsuario()}>Crear cuenta usuario</button>
                <button onClick={() => handleButtonClick('Button 2')}>Button 2</button>
                <button onClick={() => handleButtonClick('Button 3')}>Button 3</button>
            </div>
        </div>
    );
};

export default AdminHome;
