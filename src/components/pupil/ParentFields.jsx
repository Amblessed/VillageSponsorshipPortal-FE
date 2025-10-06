import React from 'react';
import PropTypes from 'prop-types';

function ParentFields({ formData, setFormData, handleParentChange }) {
    const roles = [
        { key: "father", label: "Father" },
        { key: "mother", label: "Mother" }
    ];

    const fields = [
        { key: "firstName", required: true },
        { key: "middleName", required: false },
        { key: "lastName", required: true },
        { key: "occupation", required: true },
        { key: "phone", required: true },
        { key: "alive", required: true }
    ];

    return (
        <>
            {roles.map(({ key: role, label }) => (
                <div key={role}>
                    <h4 className="font-medium text-gray-600 mb-2">{label}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields.map(({ key: field, required }) =>
                            field !== "alive" ? (
                                <input
                                    key={`${role}-${field}`}
                                    name={field}
                                    value={formData.parent[role][field]}
                                    onChange={(e) => handleParentChange(e, role)}
                                    placeholder={`${label}'s ${field}`}
                                    className="border rounded px-3 py-2 w-full text-sm"
                                    required={required}
                                />
                            ) : (
                                <div key={`${role}-${field}`}>
                                    <select
                                        name={field}
                                        value={formData.parent[role][field] ? "true" : "false"}
                                        onChange={(e) =>
                                            handleParentChange({ target: { name: field, value: e.target.value === "true" } }, role)
                                        }
                                        className="border rounded px-3 py-2 w-full text-sm"
                                        required
                                    >
                                        <option value="true">Alive</option>
                                        <option value="false">Deceased</option>
                                    </select>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                    type="number"
                    name="numberOfChildren"
                    value={formData.parent.numberOfChildren}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            parent: {
                                ...formData.parent,
                                numberOfChildren: Number.parseInt(e.target.value)
                            }
                        })
                    }
                    min="0"
                    placeholder="Number of Children"
                    className="border rounded px-3 py-2 w-full text-sm"
                    required
                />
                <div className="mt-2">
                    <p className="text-sm text-gray-700 mb-1">Are the parents separated?</p>
                    <div className="flex gap-4">
                        {['yes', 'no'].map((value) => (
                            <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="radio"
                                    name="parentsDivorced"
                                    value={value}
                                    checked={formData.parent.parentsDivorced === (value === 'yes')}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            parent: {
                                                ...formData.parent,
                                                parentsDivorced: e.target.value === 'yes'
                                            }
                                        })
                                    }
                                    className="h-4 w-4 text-green-600 border-gray-300"
                                />
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const personShape = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    alive: PropTypes.bool.isRequired,
});

ParentFields.propTypes = {
    formData: PropTypes.shape({
        parent: PropTypes.shape({
            father: personShape.isRequired,
            mother: personShape.isRequired,
            numberOfChildren: PropTypes.number.isRequired,
            parentsDivorced: PropTypes.bool.isRequired,
        }).isRequired,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    handleParentChange: PropTypes.func.isRequired,
};

export default ParentFields;
