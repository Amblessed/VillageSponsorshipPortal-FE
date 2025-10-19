import React from 'react';
import PropTypes from "prop-types";

const DonationTable = ({ title, data }) => (
    <div className="mb-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{title}</h2>
        <table className="w-full border-collapse bg-white shadow rounded-xl overflow-hidden">
            <thead className="bg-purple-100 text-gray-800">
            <tr className="text-center">
                <th className="px-4 py-2 text-center">Project Area</th>
                <th className="px-4 py-2 text-center">Target Amount (₦)</th>
                <th className="px-4 py-2 text-center">Purpose</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.area} className="border-t text-center">
                    <td className="px-4 py-2 font-medium text-center">{item.area}</td>
                    <td className="px-4 py-2 text-purple-700 font-semibold text-center">
                        ₦{item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-gray-600 text-center">{item.purpose}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default DonationTable;


DonationTable.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            area: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            purpose: PropTypes.string.isRequired
        })
    ).isRequired
};