import PropTypes from 'prop-types';
import {formatDate} from "../../utils/classLevelUtils";
import { Link } from 'react-router-dom';


export const DonorWall = ({ recentDonors }) => (
    <div className="sticky top-6 bg-purple-50 shadow rounded-xl p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🌟 Recent Donors</h2>
        {recentDonors.length > 0 ? (
            <table className="w-full border-collapse bg-white text-center rounded-md overflow-hidden">
                <thead className="bg-purple-100 text-gray-800">
                <tr>
                    <th className="px-4 py-3 text-base lg:text-lg">Name</th>
                    <th className="px-4 py-3 text-base lg:text-lg">Amount</th>
                    <th className="px-4 py-3 text-base lg:text-lg">Date</th>
                </tr>
                </thead>
                <tbody>
                {recentDonors.map((donor) => (
                    <tr key={donor.firstName + donor.lastName + donor.amount + donor.created_at} className="border-t">
                        <td className="px-4 py-3 font-medium text-sm lg:text-base">
                            {`${donor.salutation} ${donor.firstName} ${donor.middleName || ""} ${donor.lastName}`}
                        </td>
                        <td className="px-4 py-3 text-purple-700 font-semibold text-sm lg:text-base">
                            ₦{donor.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-purple-700 font-semibold text-sm lg:text-base">
                            {formatDate(donor.created_at)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p className="text-gray-600 text-center">No donations yet. Be the first to give!</p>
        )}
        <p className="text-sm text-center mt-4">
            <Link to="/donors" className="text-purple-600 underline hover:text-purple-800">
                View all donors →
            </Link>
        </p>
        <div className="mt-6 text-center">
            <p className="text-green-700 font-semibold text-base lg:text-lg">💚 Join them and make a lasting impact!</p>
        </div>
    </div>
);

DonorWall.propTypes = {
    recentDonors: PropTypes.arrayOf(
        PropTypes.shape({
            salutation: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            middleName: PropTypes.string,
            lastName: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            created_at: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date)
            ]).isRequired
        })
    ).isRequired
};

