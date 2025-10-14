import React, { useState } from 'react';
import { submitGrade } from './GradeService';
import PropTypes from 'prop-types';

const GradeForm = ({ onSubmit, firstName, lastName, birthDate }) => {
    const [formData, setFormData] = useState({
        subject: '',
        term: '',
        assessmentType: '',
        score: '',
        teacherComment: '',
    });

    const calculateGradeLetter = (score) => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gradeLetter = calculateGradeLetter(Number(formData.score));
        const gradeData = {
            ...formData,
            gradeLetter,
            pupil: {
                firstName,
                lastName,
                birthDate, // format: 'YYYY-MM-DD'
            },
        };
        try {
            await submitGrade(gradeData);
            alert('Grade saved!');
            onSubmit(gradeData);
        } catch (error) {
            console.error('Error saving grade:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="English">English</option>
                    <option value="Religion">Religion</option>
                    <option value="Social Studies">Social Studies</option>
                    {/* Add more subjects */}
                </select>

                <select
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                >
                    <option value="">Select Term</option>
                    <option value={1}>Term 1</option>
                    <option value={2}>Term 2</option>
                    <option value={3}>Term 3</option>
                </select>

                <select
                    name="assessmentType"
                    value={formData.assessmentType}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                >
                    <option value="">Assessment Type</option>
                    <option value="Exam">Exam</option>
                    <option value="Homework">Homework</option>
                </select>

                <input
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    placeholder="Score (0–100)"
                    min="0"
                    max="100"
                    required
                    className="p-2 border rounded"
                />
            </div>

            <textarea
                name="teacherComment"
                value={formData.teacherComment}
                onChange={handleChange}
                placeholder="Teacher Comment (optional)"
                className="w-full p-2 border rounded"
            />

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Save Grade
            </button>
        </form>
    );
};

GradeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,

    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,

    // Format: 'YYYY-MM-DD'
    birthDate: PropTypes.string.isRequired,
};

export default GradeForm;
