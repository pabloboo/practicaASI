import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const TeacherHome = () => {
    const navigate = useNavigate();

    const handleVerHorario = () => {
        navigate('/teacher/visualizeSchedule');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bienvenido al Inicio del Profesor</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleVerHorario()}
                    className="btn btn-primary"
                >
                    Ver Clases
                </button>
            </div>
        </div>
    );
};

export default TeacherHome;