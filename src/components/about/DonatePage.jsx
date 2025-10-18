import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable table component
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

// Main Donate Page
const DonatePage = ({ donationGoal = 12000000 }) => {
    const [salutation, setSalutation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalDonated, setTotalDonated] = useState(0);

    const progressPercent = Math.min((totalDonated / donationGoal) * 100, 100);

    const phase1Data = [
        { area: "Classroom Repairs", amount: 2500000, purpose: "Roofing, walls, floors, blackboards" },
        { area: "School Benches/Desks", amount: 2500000, purpose: "60 benches/desk @ ₦40,000 each (plus logistics: 100k)" },
        { area: "Toilets & Sanitation", amount: 350000, purpose: "Basic hygiene & safety for children" },
        { area: "School Supplies", amount: 400000, purpose: "Books, pens, chalk, teaching aids" },
        { area: "Teacher Appreciation", amount: 250000, purpose: "Gifts or stipends for teachers" },
    ];

    const phase2Data = [
        { area: "Renovated Library Space", amount: 1500000, purpose: "A place to read, grow, and dream" },
        { area: "Solar Power Installation", amount: 2000000, purpose: "Electricity for learning and safety" },
        { area: "ICT Room Setup", amount: 2500000, purpose: "Basic computers for digital literacy" },
    ];

    useEffect(() => {
        const fetchTotalDonated = async () => {
            try {
                const response = await api.get("/api/donations/total");
                setTotalDonated(response.data);
            } catch (error) {
                console.error("Error fetching total donated:", error);
                // Optionally, you could update the UI to show an error state
                // setError("Failed to load donation total");
            }
        };

        // Call the async function and handle any uncaught errors
        fetchTotalDonated().catch(error => {
            console.error("Unhandled error in fetchTotalDonated:", error);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            salutation,
            firstName,
            middleName,
            lastName,
            telephone,
            amount: Number.parseInt(amount),
            message,
        };

        try {
            const response = await api.post("/api/donations", payload);

            if (response.status === 200 || response.status === 201) {
                toast.success(`Thank you, ${salutation} ${firstName} ${middleName} ${lastName}, for your donation of ₦${amount}!`);
                setSalutation("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setTelephone("");
                setAmount("");
                setMessage("");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Donation error:", error);
            toast.error("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <section className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-12 px-6 flex flex-col items-center">
            <div className="max-w-4xl text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">🎯 Giving Vision Plan</h1>
                <p className="text-lg text-gray-700">
                    “To transform St. Damian Nursery and Primary School, Amandugba into a place where every child learns with dignity, safety, and hope—one gift at a time.”
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-4xl bg-white shadow rounded-xl p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">📊 Project Progress</h2>
                <p className="text-gray-700 text-center mb-4">
                    ₦{totalDonated.toLocaleString()} raised out of ₦{donationGoal.toLocaleString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">
                    {progressPercent.toFixed(1)}% of our goal reached
                </p>
            </div>

            {/* Tables */}
            <DonationTable title="📊 Phase 1: Immediate Impact" data={phase1Data} />
            <DonationTable title="📈 Phase 2: Long-Term Vision" data={phase2Data} />
            <ToastContainer position="top-center" autoClose={6000} />

            {/* Payment Form */}
            <div className="bg-white shadow rounded-xl p-6 w-full max-w-4xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">💖 Make a Donation</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={salutation}
                            onChange={(e) => setSalutation(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        >
                            <option value="">Select Salutation</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr">Dr</option>
                            <option value="Prof">Prof</option>
                            <option value="Barrister">Barrister</option>
                            <option value="Rev">Rev</option>
                            <option value="Chief">Chief</option>
                        </select>

                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Middle Name (optional)"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Telephone Number"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            placeholder="Amount Donated (₦)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <textarea
                        placeholder="Optional message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
        </section>
    );
};

export default DonatePage;


DonatePage.propTypes = {
    donationGoal: PropTypes.number
};

DonatePage.defaultProps = {
    donationGoal: 12000000
};

