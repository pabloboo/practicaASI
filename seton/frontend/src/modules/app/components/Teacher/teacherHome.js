import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const TeacherHome = () => {
    const navigate = useNavigate();

    const handleVerClases = () => {
        // Lógica para ver las clases del profesor
        console.log('Ver clases');
        // Puedes agregar lógica para mostrar las clases del profesor
    };

    const handleCrearClase = () => {
        // Lógica para crear una nueva clase
        console.log('Crear clase');
        // Puedes agregar lógica para permitir al profesor crear una nueva clase
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bienvenido al Inicio del Profesor</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleVerClases()}
                    className="btn btn-primary"
                >
                    Ver Clases
                </button>
                <button
                    onClick={() => handleCrearClase()}
                    className="btn btn-success"
                >
                    Crear Clase
                </button>
            </div>
        </div>
    );
};

export default TeacherHome;