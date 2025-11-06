import React, { useState, useCallback } from "react";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonationForm from "./DonationForm";
import {ProgressBar} from "./ProgressBar";
import {UrgencyGallery} from "./UrgencyGallery";
import {DonorWall} from "./DonorWall";
import {Header} from "./Header";
import { phase1Data, phase2Data } from "./donationPhases";
import DonationData from "./DonationData";
import GivingPlanSection from "./GivingPlanSection";

const DonatePage = () => {
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
    const { totalDonated, recentDonors } = DonationData();
    const donationGoal = [...phase1Data, ...phase2Data].reduce(
        (total, item) => total + item.amount,
        0
    );

    const galleryImages = Array.from({ length: 18 }, (_, i) => {
        return `/images/wornout/classroom_${i}.png`;
    });


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
            <Header />

            {/* Progress Bar */}
            <ProgressBar totalDonated={totalDonated} donationGoal={donationGoal} />
            <UrgencyGallery galleryImages={galleryImages} />


            {/* Grid Layout */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left: Tables + Form */}
                <div className="lg:col-span-2 space-y-10">
                    <GivingPlanSection />
                    <DonationForm
                        formData={formData}
                        setFormData={setFormData}
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </div>

                {/* Right: Donor Wall */}
                <div className="lg:col-span-1">
                    <DonorWall recentDonors={recentDonors} />
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={6000} />
        </section>
    );
};

export default DonatePage;

