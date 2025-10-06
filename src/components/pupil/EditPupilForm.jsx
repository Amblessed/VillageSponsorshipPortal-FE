import React, { useState } from "react";
import PropTypes from "prop-types";

export default function EditPupilForm({ pupil, onCancel, onSave }) {
    const safePupil = pupil ?? {
        firstName: "",
        middleName: "",
        lastName: "",
        birthDate: "",
        village: "",
        payments: []
    };

    const [form, setForm] = useState(() => ({
        ...safePupil,
        payments: Array.isArray(safePupil.payments) ? safePupil.payments : []
    }));

    const [openIndex, setOpenIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleTermChange = (index, field, value) => {
        const updatedTerms = [...form.payments];
        updatedTerms[index] = { ...updatedTerms[index], [field]: value };
        setForm(prev => ({ ...prev, payments: updatedTerms }));
    };

    const addTermPayment = () => {
        setForm(prev => ({
            ...prev,
            payments: [
                ...prev.payments,
                {
                    id: null,
                    termNumber: 1,
                    classLevel: "PRIMARY_ONE",
                    totalPaid: 0,
                    fullyPaid: false
                }
            ]
        }));
        setOpenIndex(form.payments.length); // open the newly added one
    };

    const formatClassLevel = (level) =>
        level.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-indigo-50 p-4 rounded-md shadow space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName || ""} onChange={handleChange} placeholder="First Name" className="p-2 border rounded" readOnly={!!form.firstName}/>
                <input name="middleName" value={form.middleName || ""} onChange={handleChange} placeholder="Middle Name" className="p-2 border rounded" readOnly={!!form.middleName}/>
                <input name="lastName" value={form.lastName || ""} onChange={handleChange} placeholder="Last Name" className="p-2 border rounded" readOnly={!!form.lastName}/>
                <input name="birthDate" type="date" value={form.birthDate || ""} onChange={handleChange} className="p-2 border rounded" readOnly={!!form.birthDate}/>
                <input name="village" value={form.village || ""} onChange={handleChange} placeholder="Village" className="p-2 border rounded" readOnly={!!form.village}/>
            </div>

            <div className="mt-4 space-y-4">
                <h4 className="text-md font-semibold text-green-700">Term Payments</h4>
                {form.payments.length > 0 ? (
                    form.payments.map((term, index) => {
                        const termKey = term.id ?? `${term.termNumber}-${term.classLevel}-${index}`;
                        const isOpen = openIndex === index;

                        return (
                            <div key={termKey} className="border rounded-md shadow">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full text-left p-2 bg-green-100 hover:bg-green-200 font-semibold"
                                >
                                    Term {term.termNumber} – {formatClassLevel(term.classLevel)}
                                </button>

                                {isOpen && (
                                    <div className="p-4 bg-white space-y-2">
                                        <select
                                            value={term.termNumber}
                                            onChange={e => handleTermChange(index, "termNumber", Number.parseInt(e.target.value))}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value={1}>Term 1</option>
                                            <option value={2}>Term 2</option>
                                            <option value={3}>Term 3</option>
                                        </select>

                                        <select
                                            value={term.classLevel}
                                            onChange={e => handleTermChange(index, "classLevel", e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="NURSERY_ONE">Nursery 1</option>
                                            <option value="NURSERY_TWO">Nursery 2</option>
                                            <option value="PRIMARY_ONE">Primary 1</option>
                                            <option value="PRIMARY_TWO">Primary 2</option>
                                            <option value="PRIMARY_THREE">Primary 3</option>
                                            <option value="PRIMARY_FOUR">Primary 4</option>
                                            <option value="PRIMARY_FIVE">Primary 5</option>
                                            <option value="PRIMARY_SIX">Primary 6</option>
                                        </select>

                                        <input
                                            type="number"
                                            value={term.totalPaid}
                                            onChange={e => handleTermChange(index, "totalPaid", e.target.value)}
                                            placeholder="Total Paid"
                                            className="w-full p-2 border rounded"
                                        />

                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={term.fullyPaid}
                                                onChange={e => handleTermChange(index, "fullyPaid", e.target.checked)}
                                            />
                                            <span>Fully Paid</span>
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => setOpenIndex(null)}
                                            className="text-sm text-gray-600 hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-sm text-yellow-700">No term payments yet. You can add one below.</p>
                )}

                <button
                    type="button"
                    onClick={addTermPayment}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ➕ Add Term Payment
                </button>
            </div>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
        </form>
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
        termPayments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                termNumber: PropTypes.number.isRequired,
                classLevel: PropTypes.string.isRequired,
                expectedAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                fullyPaid: PropTypes.bool.isRequired,
            })
        ),
    }),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
