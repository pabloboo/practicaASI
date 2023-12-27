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
        return <div>Loading...</div>;
    }

    if (noContent) {
        return <div>No students found for this teacher.</div>;
    }

    return (
        <div>
            <h2>Students</h2>
            {inscriptions.map((inscription) => (
                <div key={inscription.id}>
                    <h3>{inscription.classEntity.groupName}</h3>
                    <ul>
                        {inscription.classEntity.students.map((student) => (
                            <li key={student.id}>{student.name} - {student.grade}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default StudentsList;
