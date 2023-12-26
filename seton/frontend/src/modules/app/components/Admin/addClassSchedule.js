import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"; // Importa los estilos de Bootstrap

const ClassScheduleForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [classScheduleData, setClassScheduleData] = useState({
        classEntityId: '1',
        scheduleId: '1'
    });

    const [classEntities, setClassEntities] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const handleClassEntityChange = (e) => {
        const selectedClassEntityId = e.target.value;
        setClassScheduleData({ ...classScheduleData, classEntityId: selectedClassEntityId });
    };

    const handleScheduleChange = (e) => {
        const selectedScheduleId = e.target.value;
        setClassScheduleData({ ...classScheduleData, scheduleId: selectedScheduleId });
    };

    useEffect(() => {
        const fetchClassEntities = async () => {
            try {
                const response = await fetch('api/classes');
                if (response.ok) {
                    const data = await response.json();
                    setClassEntities(data);
                } else {
                    console.error('Failed to fetch classes');
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        // Fetch teachers from the server
        const fetchSchedules = async () => {
            try {
                const response = await fetch('api/schedules');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Loguea los datos para verificar si se están recuperando correctamente
                    setSchedules(data);
                } else {
                    console.error('Failed to fetch schedules');
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchClassEntities();
        fetchSchedules();
    }, [schedules]); // Agrega 'schedules' al array de dependencias


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('classId', classScheduleData.classEntityId);
            formData.append('scheduleId', classScheduleData.scheduleId);

            const token = localStorage.getItem('token');
            const response = await fetch('api/classSchedules/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inscription created:', data);
                setSuccessMessage('Horario de clase creado correctamente');
                setErrorMessage('');
            } else {
                // Handle errors, e.g., display an error message
                console.error('Failed to create class schedule');
                setErrorMessage('Error al crear el horario de clase');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al crear el horario de clase');
        }
    };

    const handleAccept = () => {
        navigate('/admin/home');
        setSuccessMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Crear Horario de clase</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="classEntityId" className="form-label">
                        Clase
                    </label>
                    <select
                        className="form-control"
                        id="classEntityId"
                        name="classEntityId"
                        value={classScheduleData.classEntityId}
                        onChange={handleClassEntityChange}
                    >
                        {classEntities.map((classEntity) => (
                            <option key={classEntity.id} value={classEntity.id}>
                                {classEntity.groupName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="scheduleId" className="form-label">
                        Horario
                    </label>
                    <select
                        className="form-control"
                        id="scheduleId"
                        name="scheduleId"
                        value={classScheduleData.studentId}
                        onChange={handleScheduleChange}
                    >
                        {schedules.map((schedule) => (
                            <option key={schedule.id} value={schedule.id}>
                                {schedule.startTime} - {schedule.endTime} - {schedule.weekDay} - {schedule.classroom}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Crear horario de clase
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

}

export default ClassScheduleForm;