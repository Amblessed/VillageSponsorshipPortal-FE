// src/hooks/DonationData.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

const DonationData = () => {
    const [totalDonated, setTotalDonated] = useState(0);
    const [recentDonors, setRecentDonors] = useState([]);

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

    return { totalDonated, recentDonors };
};

export default DonationData;