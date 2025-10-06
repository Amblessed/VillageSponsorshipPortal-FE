
import React from "react";
import { GUARDIAN_OPTIONS } from "../../constants/guardianOptions";

export default function GuardianFields({ formData, setFormData }) {
  const guardian = formData.guardian || {
    firstName: "",
    middleName: "",
    lastName: "",
    occupation: "",
    phoneNumber: "",
    address: "",
    relationshipToPupil: ""
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      guardian: {
        ...guardian,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          value={guardian.firstName}
          onChange={handleFieldChange}
          placeholder="First Name"
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          name="middleName"
          value={guardian.middleName}
          onChange={handleFieldChange}
          placeholder="Middle Name (optional)"
          className="border rounded px-3 py-2 w-full text-sm"
        />
        <input
          name="lastName"
          value={guardian.lastName}
          onChange={handleFieldChange}
          placeholder="Last Name"
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          name="occupation"
          value={guardian.occupation}
          onChange={handleFieldChange}
          placeholder="Occupation"
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          name="phoneNumber"
          value={guardian.phoneNumber}
          onChange={handleFieldChange}
          placeholder="Phone"
          className="border rounded px-3 py-2 w-full text-sm col-span-1 md:col-span-2"
          required
        />
        <input
          name="address"
          value={guardian.address}
          onChange={handleFieldChange}
          placeholder="Address"
          className="border rounded px-3 py-2 w-full text-sm col-span-1 md:col-span-2"
          required
        />
        <div>
        {/* <label className="text-sm font-medium text-gray-700 block mb-1">Relationship</label> */}
        <select
          name="relationship"
          value={guardian.relationshipToPupil}
          onChange={handleFieldChange}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        >
          <option value="">Select relationship</option>
          {GUARDIAN_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0) + g.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
}

