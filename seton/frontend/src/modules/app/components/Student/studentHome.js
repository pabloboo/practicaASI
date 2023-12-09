import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const StudentHome = () => {
    const navigate = useNavigate();

    const handleVerNotas = () => {
        // Lógica para ver las notas del estudiante
        console.log('Ver notas');
        // Puedes agregar lógica para mostrar las notas del estudiante
    };

    const handleVerHorario = () => {
        // Lógica para ver el horario del estudiante
        console.log('Ver horario');
        // Puedes agregar lógica para mostrar el horario del estudiante
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bienvenido al Inicio del Estudiante</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleVerNotas()}
                    className="btn btn-primary"
                >
                    Ver Notas
                </button>
                <button
                    onClick={() => handleVerHorario()}
                    className="btn btn-success"
                >
                    Ver Horario
                </button>
            </div>
        </div>
    );
};

export default StudentHome;