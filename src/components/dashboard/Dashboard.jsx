import React from 'react';
import PropTypes from 'prop-types'
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ pupils }) => {
    const totalPupils = pupils.length;
    console.log(pupils);

    const genderData = {
        labels: ['Male', 'Female'],
        datasets: [{
            data: pupils.reduce((acc, p) => {
                if (p.gender === 'MALE') acc[0]++;
                else if (p.gender === 'FEMALE') acc[1]++;
                return acc;
            }, [0, 0]),
            backgroundColor: ['#1E3A8A', '#BE185D']
        }]
    };

    const villageCounts = pupils.reduce((acc, p) => {
        acc[p.village] = (acc[p.village] || 0) + 1;
        return acc;
    }, {});
    const villageData = {
        labels: Object.keys(villageCounts),
        datasets: [{
            label: 'Pupils per Village',
            data: Object.values(villageCounts),
            backgroundColor: '#5C7AEA'
        }]
    };

    const villageGenderMap = {};

    pupils.forEach(p => {
        const village = p.village;
        const gender = p.gender;

        if (!villageGenderMap[village]) {
            villageGenderMap[village] = { MALE: 0, FEMALE: 0 };
        }

        if (gender === 'MALE') villageGenderMap[village].MALE++;
        else if (gender === 'FEMALE') villageGenderMap[village].FEMALE++;
    });

    const villageLabels = Object.keys(villageGenderMap);
    const maleCounts = villageLabels.map(v => villageGenderMap[v].MALE);
    const femaleCounts = villageLabels.map(v => villageGenderMap[v].FEMALE);

    const genderByVillageData = {
        labels: villageLabels,
        datasets: [
            {
                label: 'Male',
                data: maleCounts,
                backgroundColor: '#1E3A8A'
            },
            {
                label: 'Female',
                data: femaleCounts,
                backgroundColor: '#BE185D'
            }
        ]
    };


    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Total Pupils: {totalPupils}</h2>
            <div className="flex flex-row gap-8">
                <div className="w-[400px]">
                    <h3 className="text-lg font-semibold mb-2">Gender Distribution</h3>
                    <Pie data={genderData} />
                </div>
                <div className="w-[600px]">
                    <h3 className="text-lg font-semibold mb-2">Village Representation</h3>
                    <Bar data={villageData} />
                </div>
                <div className="w-full mt-8">
                    <h3 className="text-lg font-semibold mb-2">Gender Distribution by Village</h3>
                    <Bar data={genderByVillageData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    pupils: PropTypes.arrayOf(
        PropTypes.shape({
            gender: PropTypes.string.isRequired,
            village: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Dashboard;
