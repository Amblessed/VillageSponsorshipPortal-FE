import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api/axios";
import {
    formatTerm,
    formatTermEnum,
    formatDescriptor,
    formatGradeLetter,
    formatAssessment,
} from "../../utils/gradeUtils";
import { mapClassLabelToEnum, formatClassLabel } from "../../utils/classLevelUtils";
import ClassSelector from "../../selectors/ClassSelector";
import TermSelector from "../../selectors/TermSelector";
import { generateTermReportPDF } from "../../utils/pdfReportGenerator";

export default function GradeViewerModal({ firstName, lastName, birthDate, classLevel, onClose }) {
    const startingClassEnum = mapClassLabelToEnum(classLevel);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(startingClassEnum);
    const [selectedTerm, setSelectedTerm] = useState("");

    useEffect(() => {
        const loadGrades = async () => {
            try {
                const {data} = await api.get("/api/grades/pupil", {
                    params: {firstName, lastName, birthDate},
                });
                setGrades(data || []);
            } catch (error) {
                console.error("Failed to load grades: ", error);
                setGrades([]);
            } finally {
                setLoading(false);
            }
        };

        loadGrades();
    }, [firstName, lastName, birthDate]);

    const filterGrades = (term) => {
        const formattedTerm = term === "ALL" ? null : formatTermEnum(term);

        return grades
            .filter((g) => {
                const termMatch = term === "ALL" || g.term === formattedTerm;
                const classMatch = g.classLevel === formatClassLabel(selectedClass);
                return classMatch && termMatch;
            })
            .sort((a, b) => a.subject.localeCompare(b.subject));
    };


    const renderTable = (termGrades) => (
        <table className="w-full border border-gray-300 rounded mb-4">
            <thead className="bg-indigo-100">
            <tr>
                <th className="text-left px-2 py-1">Subject</th>
                <th className="text-left px-2 py-1">Type</th>
                <th className="text-left px-2 py-1">Score</th>
                <th className="text-left px-2 py-1">Class Level</th>
                <th className="text-left px-2 py-1">Grade</th>
                <th className="text-left px-2 py-1">Descriptor</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {termGrades.map((g) => (
                <tr key={`${g.subject}-${g.term}-${g.classLevel}-${g.assessmentType}`}>
                    <td className="px-2 py-1">{g.subject}</td>
                    <td className="px-2 py-1">{formatAssessment(g.assessmentType)}</td>
                    {/*<td className="px-2 py-1">{g.term}</td>*/}
                    <td className="px-2 py-1">{g.score}</td>
                    <td className="px-2 py-1">{g.classLevel}</td>

                    <td className="px-2 py-1 font-bold text-green-700">
                        {formatGradeLetter(g.gradeLetter)}
                    </td>
                    <td className="px-2 py-1 font-bold">
                        {formatDescriptor(g.descriptor)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const renderTermSection = (term) => {
        const termGrades = filterGrades(term);
        return (
            <div key={term}>
                <h4 className="text-indigo-600 font-semibold mb-2">{formatTerm(term)}</h4>
                {termGrades.length === 0 ? (
                    <p className="text-yellow-700">No grades for {formatTerm(term)}.</p>
                ) : (
                    renderTable(termGrades)
                )}
            </div>
        );
    };

    const renderContent = () => {
        if (!selectedClass || !selectedTerm) {
            return <p className="text-gray-600">Please select class and term to view grades.</p>;
        }

        if (loading) {
            return <p className="text-gray-600">Loading grades...</p>;
        }

        if (selectedTerm === "ALL") {
            return (
                <div className="space-y-6">
                    {["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"].map(renderTermSection)}
                </div>
            );
        }

        return renderTermSection(selectedTerm);
    };

    const handleExportPDF = async () => {
        try {
            await generateTermReportPDF(
                grades,
                { firstName, lastName, birthDate, classLevel },
                selectedTerm
            );
            console.log("PDF export completed.");
        } catch (error) {
            console.error("PDF export failed:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]">
                <h3 className="text-lg font-bold text-indigo-700">
                    📖 Grades for {firstName} {lastName}
                </h3>

                <div className="flex space-x-4 flex-wrap">
                    <ClassSelector
                        value={selectedClass}
                        onChange={setSelectedClass}
                        startingLevel={startingClassEnum}
                    />
                    <TermSelector
                        value={selectedTerm}
                        onChange={setSelectedTerm}
                        includeAll={true}
                    />
                </div>

                {renderContent()}

                <button
                    onClick={handleExportPDF}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    📄 Export PDF
                </button>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

GradeViewerModal.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    classLevel: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
