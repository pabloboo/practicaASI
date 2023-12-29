import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const StudentHome = () => {
    const navigate = useNavigate();

    const handleVerHorario = () => {
        navigate('/student/visualizeSchedule');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        localStorage.removeItem('role'); // Elimina el rol del localStorage
        navigate('/'); // Redirige al usuario a la página de login
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Bienvenido al Inicio del Estudiante</h1>
            <div className="d-flex justify-content-center">
                <button
                    onClick={() => handleVerHorario()}
                    className="btn btn-primary"
                >
                    Ver Horario
                </button>
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-md-4">
                    <button onClick={handleLogout} className="btn btn-danger w-100">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;