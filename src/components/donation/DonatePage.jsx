import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonationTable from "./DonationTable";
import DonationForm from "./DonationForm";
import {formatDate} from "../../utils/classLevelUtils";

const DonatePage = ({ donationGoal = 12000000 }) => {
    const [formData, setFormData] = useState({
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        telephone: "",
        amount: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [totalDonated, setTotalDonated] = useState(0);
    const [recentDonors, setRecentDonors] = useState([]);

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

    const galleryImages = [
        "/images/wornout/classroom_0.png",
        "/images/wornout/classroom_1.png",
        "/images/wornout/classroom_2.png",
        "/images/wornout/classroom_3.png",
        "/images/wornout/classroom_4.png",
        "/images/wornout/classroom_5.png",
        "/images/wornout/classroom_6.png",
        "/images/wornout/classroom_8.png",
        "/images/wornout/classroom_9.png",
        "/images/wornout/classroom_10.png",
    ];

    useEffect(() => {
        const fetchTotalDonated = async () => {
            try {
                const response = await api.get("/api/donations/total");
                setTotalDonated(response.data);
            } catch (error) {
                console.error("Error fetching total donated:", error);
            }
        };

        const fetchRecentDonors = async () => {
            try {
                const response = await api.get("/api/donations");
                setRecentDonors(response.data);
            } catch (error) {
                console.error("Error fetching recent donors:", error);
            }
        };

        fetchTotalDonated();
        fetchRecentDonors();
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            amount: Number.parseInt(formData.amount),
        };

        try {
            const response = await api.post("/api/donations", payload);

            if (response.status === 200 || response.status === 201) {
                toast.success(`Thank you, ${formData.salutation} ${formData.firstName} ${formData.middleName} ${formData.lastName}, for your donation of ₦${formData.amount}!`);
                setFormData({
                    salutation: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    telephone: "",
                    amount: "",
                    message: "",
                });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Donation error:", error);
            toast.error("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [formData]);

    return (
        <section className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-16 px-8 lg:px-12 flex flex-col items-center">
            <div className="max-w-7xl text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">🎯 Giving Vision Plan</h1>
                <p className="text-lg lg:text-xl text-gray-700">
                    “To transform St. Damian Nursery and Primary School, Amandugba into a place where every child learns with dignity, safety, and hope—one gift at a time.”
                </p>
            </div>

            {/* Progress Bar */}
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

            <div className="w-full max-w-7xl bg-white shadow rounded-xl p-8 mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">📸 The Urgent Need</h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                    These are real classrooms. Your gift helps replace broken chairs, desks, and restore dignity to learning.
                </p>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="rounded-lg"
                >
                    {galleryImages.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Urgency ${index + 1}`}
                                className="w-full h-[1000px] object-cover rounded-lg shadow-md transition duration-500 brightness-125"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <p className="text-sm text-gray-600 text-center mt-4 italic">
                    “This is what children face daily. Let’s change that together.”
                </p>
            </div>

            {/* Grid Layout */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left: Tables + Form */}
                <div className="lg:col-span-2 space-y-10">
                    <DonationTable title="📊 Phase 1: Immediate Impact" data={phase1Data} />
                    <DonationTable title="📈 Phase 2: Long-Term Vision" data={phase2Data} />
                    <DonationForm
                        formData={formData}
                        setFormData={setFormData}
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </div>

                {/* Right: Donor Wall */}
                <div className="lg:col-span-1">
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
                                {recentDonors.map((donor, index) => (
                                    <tr key={index} className="border-t">
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
                            <a href="/donors" className="text-purple-600 underline hover:text-purple-800">
                                View all donors →
                            </a>
                        </p>
                        <div className="mt-6 text-center">
                            <p className="text-green-700 font-semibold text-base lg:text-lg">💚 Join them and make a lasting impact!</p>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={6000} />
        </section>
    );
};

export default DonatePage;

DonatePage.propTypes = {
    donationGoal: PropTypes.number,
};

DonatePage.defaultProps = {
    donationGoal: 12000000,
};
