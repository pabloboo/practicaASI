import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const AdminHome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        localStorage.removeItem('role'); // Elimina el rol del localStorage
        navigate('/'); // Redirige al usuario a la página de login
    };

    const handleCrearProfesor = () => {
        navigate('/admin/addTeacher');
    };

    const handleCrearEstudiante = () => {
        navigate('/admin/addStudent');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Administrador</h1>
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
            <button onClick={handleLogout} className="btn btn-danger mt-3">
                Logout
            </button>
        </div>
    );
};

export default AdminHome;
