import React, { useState } from 'react';
import EditPupilForm from './EditPupilForm';
import GradeForm from '../grade/GradeForm';
import GradeTable from '../grade/GradeTable';

export default function PupilDashboard({ initialPupil }) {
    const [pupil, setPupil] = useState(initialPupil);

    const handlePupilSave = (updatedPupil) => {
        setPupil(updatedPupil);
    };

    const handleGradeSubmit = (newGrade) => {
        console.log('Grade submitted:', newGrade);
        // Optionally trigger a refresh or update local state
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-indigo-700">
                Managing {pupil.firstName} {pupil.lastName}
            </h2>

            <EditPupilForm
                pupil={pupil}
                onCancel={() => console.log('Edit cancelled')}
                onSave={handlePupilSave}
            />

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-green-700">Enter New Grade</h3>
                <GradeForm
                    firstName={pupil.firstName}
                    lastName={pupil.lastName}
                    birthDate={pupil.birthDate}
                    onSubmit={handleGradeSubmit}
                />
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-blue-700">Grade History</h3>
                <GradeTable
                    firstName={pupil.firstName}
                    lastName={pupil.lastName}
                    birthDate={pupil.birthDate}
                />
            </div>
        </div>
    );
}
