import React from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Thank You!</h2>
        <p className="text-gray-700 text-sm mb-6">
          The child’s profile has been submitted successfully. May your generosity sow joy and dignity.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;

