import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const TeacherHome = () => {
    const navigate = useNavigate();

    const handleVerHorario = () => {
        navigate('/teacher/visualizeSchedule');
    };

    const handleVerAlumnos = () => {
        navigate('/teacher/visualizeStudents');
    };
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bienvenido al Inicio del Profesor</h1>
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => handleVerHorario()}
                    className="btn btn-primary mr-2"
                >
                    Ver Clases
                </button>
                <button
                    onClick={() => handleVerAlumnos()}
                    className="btn btn-primary"
                >
                    Ver Alumnos
                </button>
            </div>
        </div>
    );



};

export default TeacherHome;