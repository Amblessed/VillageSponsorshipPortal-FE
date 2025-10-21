import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Dashboard from './Dashboard';

const DashboardContainer = () => {
    const [pupils, setPupils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/api/pupils')
            .then(res => {
                setPupils(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching pupils:', err);
                setError('Unable to load pupil data');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading sponsor dashboard...</p>;
    if (error) return <p>{error}</p>;

    return <Dashboard pupils={pupils} />;
};

export default DashboardContainer;
