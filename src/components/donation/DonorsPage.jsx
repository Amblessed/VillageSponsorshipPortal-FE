import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import DonorTable from "./DonorsTable";

const DonorsPage = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await api.get("/api/donations"); // Adjust endpoint as needed
                setDonors(response.data);
            } catch (error) {
                console.error("Error fetching donors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, []);

    return (
        <section className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-12 px-6 flex flex-col items-center">
            <div className="max-w-4xl text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">🌟 Donor Wall</h1>
                <p className="text-lg text-gray-700">
                    Honoring every gift that brings dignity, safety, and hope to the children of Amandugba.
                </p>
            </div>

            {loading ? (
                <p className="text-gray-600">Loading donors...</p>
            ) : (
                <DonorTable donors={donors} />
            )}

            {/* 👇 Back to Donate Page Link */}
            <div className="mt-8">
                <a
                    href="/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm underline">
                    ← Back to Donate Page
                </a>
            </div>
        </section>


    );
};

export default DonorsPage;
