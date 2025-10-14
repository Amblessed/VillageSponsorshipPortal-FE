import React, { useState } from "react";
import PropTypes from "prop-types";

const PromotePupilModal = ({ onClose, onPromote }) => {
    const [nextClassLevel, setNextClassLevel] = useState("");
    const [startDate, setStartDate] = useState("");

    const handleSubmit = () => {
        if (!nextClassLevel || !startDate) return;

        onPromote({ nextClassLevel, startDate });
        onClose();
    };

    return (
        <div className="bg-white p-6 rounded shadow-md border border-indigo-300 mt-4">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Promote Pupil</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Class Level</label>
                <select
                    value={nextClassLevel}
                    onChange={(e) => setNextClassLevel(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select class level</option>
                    <option value="PRIMARY_1">Primary 1</option>
                    <option value="PRIMARY_2">Primary 2</option>
                    <option value="PRIMARY_3">Primary 3</option>
                    <option value="PRIMARY_4">Primary 4</option>
                    <option value="PRIMARY_5">Primary 5</option>
                    <option value="PRIMARY_6">Primary 6</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    ✅ Confirm Promotion
                </button>
                <button
                    onClick={onClose}
                    className="text-sm text-gray-600 hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

PromotePupilModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onPromote: PropTypes.func.isRequired,
};

export default PromotePupilModal;
