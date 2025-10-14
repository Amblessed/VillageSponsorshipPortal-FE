import React, { useState } from "react";
import PropTypes from "prop-types";
import TermPaymentEditor from "../termpayment/TermPaymentEditor";
import AddTermPaymentModal from "../termpayment/AddPaymentModal";
import AddGradeModal from "../grade/AddGradeModal";
import PromotePupilModal from "../pupilprogression/PromotePupilModal";
import api from "../../api/axios";
import {mapClassLabelToEnum} from "../../utils/classLevelUtils";


export default function EditPupilForm({ pupil, onCancel, onSave }) {
    const safePupil = pupil ?? {
        firstName: "",
        middleName: "",
        lastName: "",
        birthDate: "",
        village: "",
        classLevel: "",
        payments: [],
    };

    const [form, setForm] = useState(() => ({
        ...safePupil,
        payments: Array.isArray(safePupil.payments) ? safePupil.payments : [],
    }));

    const [showPaymentsEditor, setShowPaymentsEditor] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddGradeModal, setShowAddGradeModal] = useState(false);
    const [showPromoteModal, setShowPromoteModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const savePaymentsToBackend = async (updatedPayments) => {
        try {
            await api.put("/pupil/term-payment", {
                firstName: form.firstName,
                lastName: form.lastName,
                birthDate: form.birthDate,
                payments: updatedPayments,
            });

            console.log("Payments saved to backend");
        } catch (error) {
            console.error("Failed to save payments:", error);
            alert("Failed to save payments.");
        }
    };

    const handlePromotion = async ({ nextClassLevel, startDate }) => {
        try {
            await api.post("/api/pupils/promote", {
                firstName: form.firstName,
                lastName: form.lastName,
                birthDate: form.birthDate,
                nextClassLevel,
                startDate,
            });

            setForm((prev) => ({
                ...prev,
                classLevel: nextClassLevel,
            }));

            console.log("Promoted to:", nextClassLevel, "starting", startDate);
        } catch (error) {
            console.error("Promotion failed:", error);
            alert("Failed to promote pupil.");
        }
    };

    return (
        <div className="bg-indigo-50 p-4 rounded-md shadow space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="p-2 border rounded"
                    readOnly={!!form.firstName}
                />
                <input
                    name="middleName"
                    value={form.middleName || ""}
                    onChange={handleChange}
                    placeholder="Middle Name"
                    className="p-2 border rounded"
                    readOnly={!!form.middleName}
                />
                <input
                    name="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="p-2 border rounded"
                    readOnly={!!form.lastName}
                />
                <input
                    name="birthDate"
                    type="date"
                    value={form.birthDate || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    readOnly={!!form.birthDate}
                />
                <input
                    name="village"
                    value={form.village || ""}
                    onChange={handleChange}
                    placeholder="Village"
                    className="p-2 border rounded"
                    readOnly={!!form.village}
                />
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4">
                <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ➕ Add Term Payment
                </button>

                <button
                    type="button"
                    onClick={() => setShowPaymentsEditor(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ✏️ Edit Term Payments
                </button>

                <button
                    type="button"
                    onClick={() => setShowAddGradeModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ➕ Add Grade
                </button>

                <button
                    type="button"
                    onClick={() => setShowPromoteModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    🚀 Promote Pupil
                </button>
            </div>

            {showAddModal && (
                <AddTermPaymentModal
                    startingClassLevel={mapClassLabelToEnum(pupil.classLevel)}
                    onAdd={(newTerm) =>
                        setForm((prev) => ({
                            ...prev,
                            payments: [...prev.payments, newTerm],
                        }))
                    }
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {showPaymentsEditor && (
                <TermPaymentEditor
                    payments={form.payments}
                    onUpdate={(updatedPayments) =>{
                        setForm((prev) => ({ ...prev, payments: updatedPayments }));
                        savePaymentsToBackend(updatedPayments);
                    }}
                    onClose={() => setShowPaymentsEditor(false)}
                />
            )}

            {showAddGradeModal && (
                <AddGradeModal
                    firstName={form.firstName}
                    lastName={form.lastName}
                    birthDate={form.birthDate}
                    currentClassLevel={mapClassLabelToEnum(pupil.classLevel)}
                    onAdd={(newGrade) => console.log("Grade added:", newGrade)}
                    onClose={() => setShowAddGradeModal(false)}
                />
            )}

            {showPromoteModal && (
                <PromotePupilModal
                    onClose={() => setShowPromoteModal(false)}
                    onPromote={handlePromotion}
                />
            )}
        </div>
    );
}

EditPupilForm.propTypes = {
    pupil: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        middleName: PropTypes.string,
        lastName: PropTypes.string,
        birthDate: PropTypes.string,
        village: PropTypes.string,
        classLevel: PropTypes.string,
        classLevelLabel: PropTypes.string,
        payments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                termNumber: PropTypes.number.isRequired,
                classLevel: PropTypes.string.isRequired,
                expectedAmount: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]).isRequired,
                fullyPaid: PropTypes.bool.isRequired,
            })
        ),
    }),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
