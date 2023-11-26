import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

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

            // If you want to show a preview of the selected image:
            // You can create a URL for the selected file and store it in another state
            // const imageUrl = URL.createObjectURL(imageFile);
            // setImagePreviewUrl(imageUrl); // setImagePreviewUrl is a state to store the preview URL
        } else {
            setTeacherData({ ...teacherData, [name]: value });
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguageId = e.target.value;
        console.log(selectedLanguageId);
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
            console.log([...formData]);

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
                // Handle errors, e.g., display an error message
                console.error('Failed to create teacher');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                type="text"
                name="userName"
                placeholder="Username"
                value={teacherData.userName}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={teacherData.password}
                onChange={handleChange}
            />
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={teacherData.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={teacherData.lastName}
                onChange={handleChange}
            />
            <input
                type="file"
                name="image"
                onChange={handleChange}
            />
            <select name="languageId" value={teacherData.languageId} onChange={handleLanguageChange}>
                {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                ))}
            </select>
            <button type="submit">Create Teacher</button>
        </form>
    );
};

export default TeacherForm;
