import React, { useState } from "react";
import PropTypes from "prop-types";

const classLevels = [
    "NURSERY_ONE",
    "NURSERY_TWO",
    "PRIMARY_ONE",
    "PRIMARY_TWO",
    "PRIMARY_THREE",
    "PRIMARY_FOUR",
    "PRIMARY_FIVE",
    "PRIMARY_SIX",
];

const formatClassLabel = (value) => {
    const map = {
        NURSERY_ONE: "Nursery 1",
        NURSERY_TWO: "Nursery 2",
        PRIMARY_ONE: "Primary 1",
        PRIMARY_TWO: "Primary 2",
        PRIMARY_THREE: "Primary 3",
        PRIMARY_FOUR: "Primary 4",
        PRIMARY_FIVE: "Primary 5",
        PRIMARY_SIX: "Primary 6",
    };
    return map[value] || value;
};

export default function AddTermPaymentModal({ startingClassLevel, onAdd, onClose }) {
    const [form, setForm] = useState({
        termNumber: 1,
        classLevel: startingClassLevel,
        expectedAmount: 0,
        totalPaid: 0,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const parsed = type === "number" ? Number(value) : value;
        setForm((prev) => ({ ...prev, [name]: parsed }));
    };

    /*const percentPaid = form.expectedAmount > 0
        ? Math.min(100, (form.totalPaid / form.expectedAmount) * 100)
        : 0;
*/
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
        onClose();
    };

    const filteredClassLevels = classLevels.slice(
        classLevels.indexOf(startingClassLevel)
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4"
            >
                <h3 className="text-lg font-bold text-green-700">➕ Add Term Payment</h3>

                <label className="block text-sm font-medium text-gray-700">Class Level</label>
                <select
                    name="classLevel"
                    value={form.classLevel}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    {filteredClassLevels.map((level) => (
                        <option key={level} value={level}>
                            {formatClassLabel(level)}
                        </option>
                    ))}
                </select>

                <label className="block text-sm font-medium text-gray-700">Term</label>
                <select
                    name="termNumber"
                    value={form.termNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value={1}>Term 1</option>
                    <option value={2}>Term 2</option>
                    <option value={3}>Term 3</option>
                </select>

                <label className="block text-sm font-medium text-gray-700">Expected Amount (₦)</label>
                <input
                    type="number"
                    name="expectedAmount"
                    value={form.expectedAmount}
                    onChange={handleChange}
                    placeholder="e.g. 8000"
                    className="w-full p-2 border rounded"
                />

                <label className="block text-sm font-medium text-gray-700">Amount Paid (₦)</label>
                <input
                    type="number"
                    name="totalPaid"
                    value={form.totalPaid}
                    onChange={handleChange}
                    placeholder="e.g. 4000"
                    className="w-full p-2 border rounded"
                />

                {/*<div className="text-sm text-gray-700">
                    Total Paid: ₦{form.totalPaid} of ₦{form.expectedAmount}
                </div>

                <div className="w-full bg-gray-200 rounded h-4">
                    <div
                        className="bg-green-500 h-4 rounded"
                        style={{ width: `${percentPaid}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    {Math.round(percentPaid)}% paid
                </p>
*/}
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save
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

AddTermPaymentModal.propTypes = {
    startingClassLevel: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
