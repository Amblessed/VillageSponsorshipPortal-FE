import PropTypes from 'prop-types';

export const ProgressBar = ({ totalDonated, donationGoal }) => {
    const progressPercent = Math.min((totalDonated / donationGoal) * 100, 100);

    return (
        <div className="w-full max-w-7xl bg-white shadow rounded-xl p-8 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">📊 Project Progress</h2>
            <p className="text-lg text-gray-700 text-center mb-6">
                ₦{totalDonated.toLocaleString()} raised out of ₦{donationGoal.toLocaleString()}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                    className="bg-purple-600 h-5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <p className="text-base text-gray-600 text-center mt-3">
                {progressPercent.toFixed(1)}% of our goal reached
            </p>
        </div>
    );
};


ProgressBar.propTypes = {
    totalDonated: PropTypes.number.isRequired,
    donationGoal: PropTypes.number.isRequired
};
