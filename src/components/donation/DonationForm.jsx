import React from "react";
import PropTypes from "prop-types";

const DonationForm = ({ formData, setFormData, loading, handleSubmit }) => (
    <div className="bg-white shadow rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">💖 Make a Donation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                >
                    <option value="">Select Salutation</option>
                    {["Mr", "Mrs", "Miss", "Dr", "Prof", "Barrister", "Rev", "Chief"].map((title) => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />

                <input
                    type="text"
                    placeholder="Middle Name (optional)"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />

                <input
                    type="tel"
                    placeholder="Telephone Number"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />

                <input
                    type="number"
                    min="1"
                    placeholder="Amount Donated (₦)"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>

            <textarea
                placeholder="Optional message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
            />

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex justify-center items-center"
                disabled={loading}
            >
                {loading ? "Processing..." : "Donate Now"}
            </button>
        </form>
    </div>
);

DonationForm.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default DonationForm;
