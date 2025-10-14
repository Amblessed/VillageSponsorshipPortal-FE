import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api/axios";
import {formatClassLabel,} from "../../utils/classLevelUtils";
import {calculateGradeLetter,} from "../../utils/gradeUtils";


export default function AddGradeModal({
                                          firstName,
                                          lastName,
                                          birthDate,
                                          currentClassLevel,
                                          onAdd,
                                          onClose,
                                      }) {
    const [formData, setFormData] = useState({
        subject: "",
        term: "",
        classLevel: currentClassLevel,
        assessmentType: "",
        score: "",
        teacherComment: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const score = Number(formData.score);
        const gradeLetter = calculateGradeLetter(score);

        const gradePayload = {
            ...formData,
            score,
            gradeLetter,
        };

        try {
            await api.post("/api/grades/pupil", gradePayload, {
                params: { firstName, lastName, birthDate },
            });

            onAdd(gradePayload);
            onClose();
        } catch (error) {
            console.error("Grade save failed:", error);
            const message =
                error.response?.data?.detail ||
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to save grade.";
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4"
            >
                <h3 className="text-lg font-bold text-green-700">➕ Add Grade</h3>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                        {errorMessage}
                    </div>
                )}

                <select
                    name="classLevel"
                    value={currentClassLevel}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                >
                    <option value={currentClassLevel}>
                        {formatClassLabel(currentClassLevel)}
                    </option>
                </select>

                <select
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Term</option>
                    <option value="FIRST_TERM">Term 1</option>
                    <option value="SECOND_TERM">Term 2</option>
                    <option value="THIRD_TERM">Term 3</option>
                </select>

                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="English">English</option>
                    <option value="Science">Science</option>
                    <option value="Social Studies">Social Studies</option>
                </select>

                <select
                    name="assessmentType"
                    value={formData.assessmentType}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Assessment Type</option>
                    <option value="EXAM">Exam</option>
                    <option value="HOMEWORK">Homework</option>
                    <option value="CLASSWORK">Classwork</option>
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
                    className="w-full p-2 border rounded"
                />

                <textarea
                    name="teacherComment"
                    value={formData.teacherComment}
                    onChange={handleChange}
                    placeholder="Teacher Comment (optional)"
                    className="w-full p-2 border rounded"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

AddGradeModal.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    currentClassLevel: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
