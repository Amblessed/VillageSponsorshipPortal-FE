import React from 'react';
import PropTypes from 'prop-types';

const PupilProgressionTable = ({ progressionHistory }) => {
    if (!progressionHistory || progressionHistory.length === 0) {
        return (
            <p className="text-gray-600 italic">
                This pupil’s class progression history is not yet available.
            </p>
        );
    }

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Class Progression History
            </h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Level</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Repeated</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {progressionHistory.map((entry, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-800">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                                {entry.classLevel.replace('_', ' ')}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">{entry.startDate}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{entry.endDate || '—'}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{entry.repeated ? 'Yes' : 'No'}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{entry.notes || '—'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PupilProgressionTable;


PupilProgressionTable.propTypes = {
    progressionHistory: PropTypes.arrayOf(
        PropTypes.shape({
            classLevel: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string,
            repeated: PropTypes.bool,
            notes: PropTypes.string,
        })
    ).isRequired,
};