import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap

const VisualizeStudentCalendar = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchStudentSchedules = async () => {
            try {
                const studentId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const response = await fetch(`api/classes/studentClasses/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    // Formatear los datos obtenidos para mostrarlos en el calendario
                    data.map(async (classEntity) => {
                        const classSchedulesResponse = await fetch(`api/classSchedules/getClassSchedulesByClassId/${classEntity.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        });

                        if (classSchedulesResponse.ok) {
                            const classSchedulesData = await classSchedulesResponse.json();
                            const schedulesPromises = classSchedulesData.map(async (classSchedule) => {
                                const scheduleResponse = await fetch(`api/schedules/${classSchedule.schedule.id}`, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                    }
                                });

                                if (scheduleResponse.ok) {
                                    return await scheduleResponse.json();
                                }
                                return null;
                            });

                            const schedules = await Promise.all(schedulesPromises);
                            schedules.filter(schedule => schedule !== null).map(schedule => ({
                                id: schedule.id,
                                title: classEntity.groupName,
                                start: new Date(schedule.startTime),
                                end: new Date(schedule.endTime),
                            }));
                            setSchedules(schedules);
                            console.log(schedules);
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching student schedules:', error);
            }
        };

        fetchStudentSchedules();
    }, []);

    // Función para generar la tabla de horarios
    const generateScheduleTable = () => {
        // Crear una estructura de datos para las horas y días de la semana
        const hours = Array.from({ length: 25 }, (_, i) => {
            return `${i}:00`; // Mostrar horas en lugar de media hora
        });
        const daysOfWeek = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

        // Función para redondear la hora hacia abajo a la media hora más cercana
        const roundDownToNearestHour = (time) => {
            const [hours] = time.split(':');
            return `${hours}`;
        };

        // Crear la tabla basada en los datos de los horarios
        return (
            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th></th>
                    {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map((hour) => (
                    <tr key={hour}>
                        <td>{hour}</td>
                        {daysOfWeek.map((day) => {
                            const schedule = schedules.find(
                                (schedule) =>
                                    schedule.weekDay === day &&
                                    moment(roundDownToNearestHour(schedule.startTime), 'HH:mm').isSameOrBefore(moment(hour, 'HH:mm')) &&
                                    moment(schedule.endTime, 'HH:mm').isAfter(moment(hour, 'HH:mm'))
                            );

                            return (
                                <td key={`${day}-${hour}`} className="align-middle">
                                    {schedule ? `${schedule.classroom} (${moment(schedule.startTime, 'HH:mm').format('HH:mm')}-${moment(schedule.endTime, 'HH:mm').format('HH:mm')})` : ''}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    {generateScheduleTable()}
                </div>
            </div>
        </div>
    );
};

export default VisualizeStudentCalendar;