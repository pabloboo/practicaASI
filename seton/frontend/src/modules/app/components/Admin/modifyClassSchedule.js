import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"; // Importa los estilos de Bootstrap

const ModifyClassScheduleForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [classScheduleData, setClassScheduleData] = useState({
        classScheduleId: '1',
        scheduleId: '1'
    });

    const [schedules, setSchedules] = useState([]);
    const [classSchedules, setClassSchedules] = useState([]);

    // let schedules2



    const handleScheduleChange = (e) => {
        const selectedScheduleId = e.target.value;
        setClassScheduleData({ ...classScheduleData, scheduleId: selectedScheduleId });
    };
    const handleClassScheduleChange = (e) => {
        const selectedClassScheduleId = e.target.value;
        setClassScheduleData({ ...classScheduleData, classScheduleId: selectedClassScheduleId });
    };

    useEffect(() => {

        const fetchClassSchedules = async () => {
            try {
                const response = await fetch('api/classSchedules');
                if (response.ok) {
                    const data = await response.json();
                    setClassSchedules(data);
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
                    console.log(data);
                    setSchedules(data);
                } else {
                    console.error('Failed to fetch schedules');
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
        fetchClassSchedules();

    }, [schedules]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('classId', classScheduleData.classScheduleId);
            formData.append('scheduleId', classScheduleData.scheduleId);
            // formData
            const token = localStorage.getItem('token');
            const response = await fetch('api/classSchedules/modify', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inscription modified:', data);
                setSuccessMessage('Horario de clase modificado correctamente');
                setErrorMessage('');
            } else {
                // Handle errors, e.g., display an error message
                console.error('Failed to modify class schedule');
                setErrorMessage('Error al modificar el horario de clase');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al modificar el horario de clase');
        }
    };

    const handleAccept = () => {
        navigate('/admin/home');
        setSuccessMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Modificar Horario de clase</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="classScheduleId" className="form-label">
                        Horarios de Clase
                    </label>
                    <select
                        className="form-control"
                        id="classScheduleId"
                        name="classScheduleId"
                        value={classScheduleData.classScheduleId}
                        onChange={handleClassScheduleChange}

                    >
                        {classSchedules.map((classSchedule) => (
                            <option key={classSchedule.id} value={classSchedule.id}>
                                {classSchedule.classEntity.groupName} \ {classSchedule.schedule.startTime} - {classSchedule.schedule.endTime}
                                - {classSchedule.schedule.weekDay} - {classSchedule.schedule.classroom}
                            </option>

                        ))}

                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="scheduleId" className="form-label">
                        Horario nuevo
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
                    Modificar horario de clase
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

export default ModifyClassScheduleForm;