import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const StudentHome = () => {
    const navigate = useNavigate();

    const handleVerHorario = () => {
        navigate('/student/visualizeSchedule');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bienvenido al Inicio del Estudiante</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleVerHorario()}
                    className="btn btn-primary"
                >
                    Ver Horario
                </button>
            </div>
        </div>
    );
};

export default StudentHome;