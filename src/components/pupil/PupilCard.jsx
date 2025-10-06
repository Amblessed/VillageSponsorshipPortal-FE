import React from 'react';

const calculateAge = birthDate => {
  const birth = new Date(birthDate);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
};

const PupilCard = ({ pupil }) => {
  return (
    <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        <img
        src={`http://localhost:8080/api/pupils/photo?firstName=${encodeURIComponent(pupil.firstName)}&lastName=${encodeURIComponent(pupil.lastName)}&birthDate=${pupil.birthDate}`}
        alt={`${pupil.firstName}'s photo`}
        className="w-full h-80 object-cover" 
        /* className="w-full max-w-xs md:w-64 md:h-64 object-cover rounded shadow" */
        /* className="w-full max-w-xs md:max-w-none md:w-64 md:h-64 object-cover rounded shadow" */

        onError={(e) => { e.target.src = '/default-pupil.jpg'; }}
      />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{`${pupil.firstName} ${pupil.middleName} ${pupil.lastName}`}</h2>
        <p className="text-gray-600">Age: {calculateAge(pupil.birthDate)}</p>
        <p className="text-gray-600">Class: {pupil.classLevelLabel}</p>
        <p className="text-gray-600">Village: {pupil.village}</p>
        {/* <p className="text-gray-600 mt-2 italic">“{pupil.story}”</p> */}
        <a
          href={`/sponsor?pupilId=${pupil.firstName}-${pupil.lastName}-${pupil.birthDate}`}
          className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sponsor {pupil.firstName}
        </a>
      </div>
    </div>
  );
};

export default PupilCard;
