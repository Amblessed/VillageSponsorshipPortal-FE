import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">👩‍💼 Admin Dashboard</h1>
        <p className="text-center text-gray-600">Manage pupils, sponsors, and submissions with clarity and care.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/pupils" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-green-700">📚 Manage Pupils</h2>
            <p className="text-gray-600 mt-2">View, edit, or remove pupil profiles</p>
          </Link>

          <Link to="/admin/sponsors" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-700">🤝 Manage Sponsors</h2>
            <p className="text-gray-600 mt-2">Track sponsor connections and messages</p>
          </Link>

          <Link to="/admin/reports" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-purple-700">📊 Reports</h2>
            <p className="text-gray-600 mt-2">View sponsorship stats and pupil summaries</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
