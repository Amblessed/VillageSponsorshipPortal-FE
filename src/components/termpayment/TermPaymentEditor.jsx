import React from "react";
import PropTypes from "prop-types";

export default function TermPaymentEditor({ payments, onUpdate, onClose }) {
    const handleChange = (index, field, value) => {
        const updated = [...payments];
        updated[index] = { ...updated[index], [field]: value };
        onUpdate(updated);
    };

    const formatClassLevel = (level) =>
        level.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]">
                <h3 className="text-lg font-bold text-green-700">Edit Term Payments</h3>

                {payments.map((term, index) => (
                    <div key={index} className="border p-4 rounded space-y-2">
                        <div className="font-semibold">
                            Term {term.termNumber} – {formatClassLevel(term.classLevel)}
                        </div>

                        <select
                            value={term.termNumber}
                            onChange={(e) => handleChange(index, "termNumber", Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={1}>Term 1</option>
                            <option value={2}>Term 2</option>
                            <option value={3}>Term 3</option>
                        </select>

                        <select
                            value={term.classLevel}
                            onChange={(e) => handleChange(index, "classLevel", e.target.value)}
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
                            onChange={(e) => handleChange(index, "totalPaid", e.target.value)}
                            placeholder="Total Paid"
                            className="w-full p-2 border rounded"
                        />

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={term.fullyPaid}
                                onChange={(e) => handleChange(index, "fullyPaid", e.target.checked)}
                            />
                            <span>Fully Paid</span>
                        </label>
                    </div>
                ))}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => {
                            onUpdate(payments); // Confirm changes
                            onClose();           // Close modal
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

TermPaymentEditor.propTypes = {
    payments: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
