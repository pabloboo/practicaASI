import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const TeacherForm = () => {
    const navigate = useNavigate();

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

            const response = await fetch('api/teachers/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Teacher created:', data);
                navigate('/admin/home');
                alert('Profesor creado correctamente');
            } else {
                console.error('Failed to create teacher');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Username"
                        value={teacherData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={teacherData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={teacherData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={teacherData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
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
                        Language
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
                    Create Teacher
                </button>
            </form>
        </div>
    );
};

export default TeacherForm;
