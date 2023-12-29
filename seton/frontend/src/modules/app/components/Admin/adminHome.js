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

    const handleCrearClase = () => {
        navigate('/admin/addClass');
    };

    const handleCrearInscription = () => {
        navigate('/admin/addInscription');
    };

    const handleCrearSchedule = () => {
        navigate('/admin/addSchedule');
    };

    const handleCrearClassSchedule = () => {
        navigate('/admin/addClassSchedule');
    };
    const handleModificarClass = () => {
        navigate('/admin/modifyClass');
    };
    const handleModificarClassSchedule = () => {
        navigate('/admin/modifyClassSchedule');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Administrador</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="row mb-3">
                        <div className="col">
                            <button onClick={handleCrearProfesor} className="btn btn-primary w-100">
                                Crear cuenta profesor
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={handleCrearEstudiante} className="btn btn-primary w-100">
                                Crear cuenta estudiante
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={handleCrearClase} className="btn btn-primary w-100">
                                Crear clase
                            </button>
                        </div>
                        {/* Otros botones similares */}
                    </div>
                    <div className="row">
                        <div className="col">
                            <button onClick={handleCrearInscription} className="btn btn-primary w-100">
                                Crear inscripción
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={handleCrearSchedule} className="btn btn-primary w-100">
                                Crear horario
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={handleCrearClassSchedule} className="btn btn-primary w-100">
                                Asignar horario a clase
                            </button>
                        </div>
                        {/* Otros botones similares */}
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <button onClick={handleModificarClass} className="btn btn-primary w-100">
                                Modificar clase
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={handleModificarClassSchedule} className="btn btn-primary w-100">
                                Modificar horario de clase
                            </button>
                        </div>
                    </div>
                </div>
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

export default AdminHome;
