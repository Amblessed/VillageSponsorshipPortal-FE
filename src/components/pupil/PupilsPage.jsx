import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PupilCard from './PupilCard';
import PupilSkeleton from './PupilSkeleton';

const PupilsPage = () => {
  const [pupils, setPupils] = useState([]);
  const [filteredPupils, setFilteredPupils] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/pupils')
      .then(response => {
        setPupils(response.data);
        setFilteredPupils(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pupils:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = pupils;

    if (selectedVillage) {
      filtered = filtered.filter(p => p.village === selectedVillage);
    }

    if (selectedClass) {
      filtered = filtered.filter(p => p.classLevelLabel === selectedClass);
    }

    setFilteredPupils(filtered);
  }, [selectedVillage, selectedClass, pupils]);

  const uniqueVillages = [...new Set(pupils.map(p => p.village))];
  const uniqueClasses = [...new Set(pupils.map(p => p.classLevelLabel))];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Pupils</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <select
          value={selectedVillage}
          onChange={e => setSelectedVillage(e.target.value)}
          className="px-4 py-2 border rounded bg-white shadow"
        >
          <option value="">All Villages</option>
          {uniqueVillages.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="px-4 py-2 border rounded bg-white shadow"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <PupilSkeleton key={i} />)
            : filteredPupils.map(pupil => <PupilCard key={pupil.id} pupil={pupil} />)
          }
        </div>
      </div>

      <div className="mt-12 text-center">
        <a href="/" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Home
        </a>
      </div>
    </div>
  );
};

export default PupilsPage;
