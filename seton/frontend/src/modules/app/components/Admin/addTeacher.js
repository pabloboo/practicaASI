import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const TeacherForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [teacherData, setTeacherData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        image: '',
        languageId: '1',
    });

    const [languages, setLanguages] = useState([]);

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

        fetchLanguages();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // If the input type is 'file', handle the file differently
        if (type === 'file') {
            const imageFile = e.target.files[0]; // Get the selected file
            setTeacherData({ ...teacherData, image: imageFile });
        } else {
            setTeacherData({ ...teacherData, [name]: value });
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguageId = e.target.value;
        setTeacherData({ ...teacherData, languageId: selectedLanguageId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userName', teacherData.userName);
            formData.append('password', teacherData.password);
            formData.append('firstName', teacherData.firstName);
            formData.append('lastName', teacherData.lastName);
            formData.append('languageId', teacherData.languageId);
            formData.append('image', teacherData.image);

            const token = localStorage.getItem('token');
            const response = await fetch('api/teachers/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Teacher created:', data);
                setSuccessMessage('Profesor creado correctamente');
                setErrorMessage('');
            } else {
                console.error('Failed to create teacher');
                setErrorMessage('Error al crear el profesor');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al crear el profesor');
        }
    };

    const handleAccept = () => {
        navigate('/admin/home');
        setSuccessMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Añadir profesor</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Nombre de usuario"
                        value={teacherData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={teacherData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Nombre"
                        value={teacherData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Apellidos"
                        value={teacherData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Imagen
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="languageId" className="form-label">
                        Idioma
                    </label>
                    <select
                        className="form-control"
                        id="languageId"
                        name="languageId"
                        value={teacherData.languageId}
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
                    Añadir profesor
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

export default TeacherForm;
