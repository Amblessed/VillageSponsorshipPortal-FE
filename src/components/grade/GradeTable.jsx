import { useEffect, useState } from 'react';
import { fetchGradesByPupil } from './GradeService';
import GradeBadge from './GradeBadge';

const GradeTable = ({ firstName, lastName, birthDate }) => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const loadGrades = async () => {
            try {
                const data = await fetchGradesByPupil(firstName, lastName, birthDate);
                setGrades(data);
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };
        if (firstName && lastName && birthDate) {
            loadGrades();
        }
    }, [firstName, lastName, birthDate]);

    if (!grades || grades.length === 0) {
        return <p>No grades available yet.</p>;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Subject</th>
                <th>Term</th>
                <th>Type</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Comment</th>
            </tr>
            </thead>
            <tbody>
            {grades.map((grade, index) => (
                <tr key={index}>
                    <td>{grade.subject}</td>
                    <td>{grade.term}</td>
                    <td>{grade.assessmentType}</td>
                    <td>{grade.score}</td>
                    <td><GradeBadge gradeLetter={grade.gradeLetter} /></td>
                    <td>{grade.teacherComment || '—'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GradeTable;
