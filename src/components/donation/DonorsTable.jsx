import React from "react";
import PropTypes from "prop-types";
import {formatDate} from "../../utils/classLevelUtils";

const DonorTable = ({ donors }) => (
    <div className="w-full max-w-4xl bg-white shadow rounded-xl p-6">
        <table className="w-full border-collapse bg-white text-center">
            <thead className="bg-purple-100 text-gray-800">
            <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Amount (₦)</th>
                <th className="px-4 py-2">Date Donated</th>
            </tr>
            </thead>
            <tbody>
            {donors.map((donor, index) => (
                <tr key={index} className="border-t">
                    <td className="px-4 py-2 font-medium">
                        {`${donor.salutation} ${donor.firstName} ${donor.middleName || ""} ${donor.lastName}`}
                    </td>
                    <td className="px-4 py-2 text-purple-700 font-semibold">
                        ₦{donor.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 font-medium">
                        {`${formatDate(donor.created_at)}`}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

DonorTable.propTypes = {
    donors: PropTypes.array.isRequired,
};

export default DonorTable;
