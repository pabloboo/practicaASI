import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {useNavigate} from "react-router-dom";

const ScheduleForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [classroom, setClassroom] = useState('');
    const [weekDay, setWeekDay] = useState('');

    const handleStartDateChange = date => {
        setStartTime(date);
    };

    const handleEndDateChange = date => {
        setEndTime(date);
    };

    const handleWeekDayChange = event => {
        setWeekDay(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('start_time', moment(startTime).format('HH:mm:ss'));
        formData.append('end_time', moment(endTime).format('HH:mm:ss'));
        formData.append('classroom', classroom);
        formData.append('weekDay', weekDay);

        const token = localStorage.getItem('token');
        const response = await fetch('api/schedules/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Schedule created:', data);
            setSuccessMessage('Horario creado correctamente');
            setErrorMessage('');
        } else {
            console.error('Failed to create schedule');
            setErrorMessage('Error al crear el horario');
        }

    };

    const handleAccept = () => {
        navigate('/admin/home');
        setSuccessMessage('');
    };

    return (
        <div>
            <h2>Create Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Start Time:</label>
                    <DatePicker
                        selected={startTime}
                        onChange={handleStartDateChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <DatePicker
                        selected={endTime}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </div>
                <div>
                    <label>Week Day:</label>
                    <select value={weekDay} onChange={handleWeekDayChange}>
                        <option value="">Select a day</option>
                        <option value="MONDAY">Lunes</option>
                        <option value="TUESDAY">Martes</option>
                        <option value="WEDNESDAY">Miércoles</option>
                        <option value="THURSDAY">Jueves</option>
                        <option value="FRIDAY">Viernes</option>
                        <option value="SATURDAY">Sábado</option>
                        <option value="SUNDAY">Domingo</option>
                    </select>
                </div>
                <div>
                    <label>Classroom:</label>
                    <input
                        type="text"
                        value={classroom}
                        onChange={e => setClassroom(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Horario
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

export default ScheduleForm;
