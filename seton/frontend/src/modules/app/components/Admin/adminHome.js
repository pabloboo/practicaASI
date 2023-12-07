import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const AdminHome = () => {
    const navigate = useNavigate();

    const handleButtonClick = (buttonName) => {
        // Lógica para manejar clics de botones
        console.log(`Button "${buttonName}" clicked`);
        const token = localStorage.getItem('token'); // Recupera el token del almacenamiento
        console.log(token);
        // Puedes agregar lógica para realizar acciones basadas en el botón clickeado
    };

    const handleCrearProfesor = () => {
        navigate('/admin/addTeacher');
    };

    const handleCrearEstudiante = () => {
        navigate('/admin/addStudent');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Welcome to Admin Home Page</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleCrearProfesor()}
                    className="btn btn-primary"
                >
                    Crear cuenta profesor
                </button>
                <button
                    onClick={() => handleCrearEstudiante()}
                    className="btn btn-success"
                >
                    Crear cuenta estudiante
                </button>
            </div>
        </div>
    );
};

export default AdminHome;
