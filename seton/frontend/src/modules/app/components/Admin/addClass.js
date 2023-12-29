import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"; // Importa los estilos de Bootstrap

const ClassForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [classData, setClassData] = useState({
        groupName: '',
        level: '',
        teacherId: '1',
        languageId: '1'
    });

    const [languages, setLanguages] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData({ ...classData, [name]: value });
    };

    const handleLanguageChange = (e) => {
        const selectedLanguageId = e.target.value;
        setClassData({ ...classData, languageId: selectedLanguageId });
    };

    const handleTeacherChange = (e) => {
        const selectedTeacherId = e.target.value;
        setClassData({ ...classData, teacherId: selectedTeacherId });
    };

    useEffect(() => {
        // Fetch languages from the server
        const fetchLanguages = async () => {
            try {
                const response = await fetch('api/languages');
                if (response.ok) {
                    const data = await response.json();
                    setLanguages(data);
                } else {
                    console.error('Failed to fetch languages');
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        // Fetch teachers from the server
        const fetchTeachers = async () => {
            try {
                const response = await fetch('api/teachers');
                if (response.ok) {
                    const data = await response.json();
                    setTeachers(data);
                } else {
                    console.error('Failed to fetch teachers');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchLanguages();
        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('groupName', classData.groupName);
            formData.append('level', classData.level);
            formData.append('teacherId', classData.teacherId);
            formData.append('languageId', classData.languageId);

            const token = localStorage.getItem('token');
            const response = await fetch('api/classes/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Class created:', data);
                setSuccessMessage('Clase creada correctamente');
                setErrorMessage('');
            } else {
                // Handle errors, e.g., display an error message
                console.error('Failed to create class');
                setErrorMessage('Error al crear la clase');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al crear la clase');
        }
    };

    const handleAccept = () => {
        navigate('/admin/home');
        setSuccessMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Crear Clase</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">
                        Nombre del Grupo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="groupName"
                        name="groupName"
                        placeholder="Nombre del Grupo"
                        value={classData.groupName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="level" className="form-label">
                        Nivel
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="level"
                        name="level"
                        placeholder="Nivel"
                        value={classData.level}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="teacherId" className="form-label">
                        Profesor
                    </label>
                    <select
                        className="form-control"
                        id="teacherId"
                        name="teacherId"
                        value={classData.teacherId}
                        onChange={handleTeacherChange}
                    >
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.user.userName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="languageId" className="form-label">
                        Idioma
                    </label>
                    <select
                        className="form-control"
                        id="languageId"
                        name="languageId"
                        value={classData.languageId}
                        onChange={handleLanguageChange}
                    >
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Crear Clase
                </button>
            </form>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        {successMessage && (
                            <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
                                <span>{successMessage}</span>
                                <button type="button" className="btn btn-success btn-sm" onClick={handleAccept}>
                                    Aceptar
                                </button>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassForm;