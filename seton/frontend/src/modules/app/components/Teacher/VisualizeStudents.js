import React, { useState, useEffect } from 'react';

const StudentsList = () => {
    const [inscriptions, setInscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noContent, setNoContent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teacherId = localStorage.getItem('userId');
                const response = await fetch(`api/teachers/teacher/inscriptions/${teacherId}`);

                if (response.status === 204) {
                    setNoContent(true);
                } else if (response.ok) {
                    const inscriptionsData = await response.json();
                    setInscriptions(inscriptionsData);
                } else {
                    console.error('Failed to fetch inscriptions');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }


    // Organizar alumnos por grupo
    const groupedStudents = inscriptions.reduce((acc, inscription) => {
        const groupName = inscription?.aClassEntity?.groupName;

        if (!acc[groupName]) {
            acc[groupName] = [];
        }

        acc[groupName].push(inscription);

        return acc;
    }, {});

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Estudiantes</h2>
            {noContent ? (
                <div className="alert alert-warning" role="alert">
                    No se han encontrado alumnos para este profesor.
                </div>
            ) : (
                <div>
                    {Object.entries(groupedStudents).map(([groupName, students]) => (
                        <div key={groupName} className="card bg-light border-dark mb-4">
                            <h4 className="card-header">{groupName}</h4>
                            <ul className="list-group list-group-flush">
                                {students.map((student) => (
                                    <li key={student?.aClassEntity?.student?.id} className="list-group-item">
                                        {student?.student?.user?.firstName + " " + student?.student?.user?.lastName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}
export default StudentsList;
