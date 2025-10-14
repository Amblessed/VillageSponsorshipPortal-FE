import  React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import EditPupilForm from "../pupil/EditPupilForm";

export default function PupilList() {
    const [pupils, setPupils] = useState([]);
    const [editingPupil, setEditingPupil] = useState(null);

    useEffect(() => {
        fetchPupils();
    }, []);

    const fetchPupils = async () => {
        try {
            const response = await api.get("/api/pupils");
            setPupils(response.data);
        } catch (error) {
            console.error("Failed to fetch pupils:", error);
        }
    };

    const handleDelete = async (pupilId) => {
        const confirmed = window.confirm("Are you sure you want to delete this pupil?");
        if (!confirmed) return;

        try {
            const response = await api.delete(`/api/pupils/${pupilId}`);
            if (response.status === 200) {
                alert("Pupil deleted successfully.");
                setPupils((prev) => prev.filter((p) => p.id !== pupilId));
            } else {
                alert("Failed to delete pupil. Please try again.");
            }
        } catch (error) {
            console.error("Delete error: ", error);
            alert("An error occurred. Please check your connection.");
        }
    };

    const savePayments = async ({ firstName, lastName, birthDate, payments }) => {
        return api.put("/api/pupils/pupil/term-payment", {
            firstName,
            lastName,
            birthDate,
            payments,
        });
    };

    const saveGrade = async ({ firstName, lastName, birthDate, grade }) => {
        if (!grade || typeof grade !== "object") return;
        try {
            return await api.post("/api/grades/pupil", {
                firstName,
                lastName,
                birthDate,
                ...grade,
            });
        } catch (error) {
            console.error("Grade save failed:", error);
            throw error;
        }
    };



    const handleSave = async (updatedPupil) => {
        try {
            const { firstName, lastName, birthDate, payments, grades } = updatedPupil;

            const paymentResponse = await savePayments({ firstName, lastName, birthDate, payments });
            await saveGrade({ firstName, lastName, birthDate, grades });

            await fetchPupils();
            setEditingPupil(null);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update pupil.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">🌟 Pupil Profile</h2>
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
                <tr>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">First Name</th>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">Middle Name</th>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">Last Name</th>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">Date of Birth</th>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">Village</th>
                    <th className="text-left px-4 py-3 text-indigo-800 font-semibold">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {pupils.map((pupil) => {
                    const compositeKey = `${pupil.firstName}-${pupil.lastName}-${pupil.birthDate}`;
                    return (
                        <React.Fragment key={compositeKey}>
                            <tr className="hover:bg-indigo-50 transition duration-200">
                                <td className="px-4 py-3">{pupil.firstName}</td>
                                <td className="px-4 py-3">{pupil.middleName}</td>
                                <td className="px-4 py-3">{pupil.lastName}</td>
                                <td className="px-4 py-3">{pupil.birthDate}</td>
                                <td className="px-4 py-3">{pupil.village}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Link
                                        to={`/pupil?firstName=${encodeURIComponent(pupil.firstName)}&lastName=${encodeURIComponent(pupil.lastName)}&birthDate=${pupil.birthDate}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium">
                                        View
                                    </Link>
                                    <button
                                        onClick={() => setEditingPupil(editingPupil === pupil ? null : pupil)}
                                        className="text-green-600 hover:text-green-800 font-medium"
                                    >
                                        {editingPupil === pupil ? "Cancel" : "Edit"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pupil.id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                            {editingPupil === pupil && (
                                <tr>
                                    <td colSpan={6}>
                                        <EditPupilForm
                                            pupil={editingPupil}
                                            onCancel={() => setEditingPupil(null)}
                                            onSave={handleSave}
                                        />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
