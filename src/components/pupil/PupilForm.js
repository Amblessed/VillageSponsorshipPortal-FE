import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ParentFields from './ParentFields';
import GuardianFields from './GuardianFields';
import api from "../../api/axios";


function PupilForm() {
    const navigate = useNavigate();

    const initialFormData = {
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        gender: 'MALE',
        village: 'UMUNUMO',
        classLevel: 'PRE_NURSERY',
        story: '',
        profileImage: null,
        responsiblePartyType: 'PARENT', // or 'guardian'
        guardian: {
            firstName: '',
            middleName: '',
            lastName: '',
            occupation: '',
            phoneNumber: '',
            relationship: '',
            address: ''

        },
        parent: {
            father: {firstName: '', middleName: '', lastName: '', occupation: '', phone: '', alive: true},
            mother: {firstName: '', middleName: '', lastName: '', occupation: '', phone: '', alive: true},
            parentsDivorced: false,
            numberOfChildren: 1
        }
    };

    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        setFormData({...formData, profileImage: e.target.files[0]});
    };

    function handleParentChange(e, role) {
        const { name, value } = e.target;

        const updatedParent = {
            ...formData.parent[role],
            [name]: value
        };

        // If alive is set to false, clear occupation and phone
        if (name === 'alive' && value === false) {
            updatedParent.occupation = '';
            updatedParent.phone = '';
        }

        setFormData({
            ...formData,
            parent: {
                ...formData.parent,
                [role]: updatedParent
            }
        });
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const cleanedData = {...formData};
            // ✅ Remove unused party
            if (formData.responsiblePartyType === 'GUARDIAN') {
                cleanedData.parent = null;
            } else {
                cleanedData.guardian = null;
            }

            const payload = new FormData();
            // ✅ Send full DTO as JSON blob
            payload.append('data', new Blob([JSON.stringify(cleanedData)], {type: 'application/json'}));

            // ✅ Send image if present
            if (formData.profileImage) {
                payload.append('profileImage', formData.profileImage);
            }

            console.log(payload)
            await api.post("/api/pupils", payload, {
                headers: {"Content-Type": "multipart/form-data"}
            });

            setSuccess(true);
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error saving pupil:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                navigate('/thank-you');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const toTitleCase = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const villages = [
        "UMUNUMO", "UMUELEM", "UMUEYE", "UMUDISHI", "UMUEZEALACHUKWU",
        "UMUDURUEZE", "UMUNAMA", "UMUDURU", "UMUOGWU", "UMUONA"
    ];

    const classLevels = [
        {value: "PRE_NURSERY", label: "Pre Nursery"},
        {value: "NURSERY_ONE", label: "Nursery 1"},
        {value: "NURSERY_TWO", label: "Nursery 2"},
        {value: "NURSERY_THREE", label: "Nursery 3"},
        {value: "PRIMARY_ONE", label: "Primary 1"},
        {value: "PRIMARY_TWO", label: "Primary 2"},
        {value: "PRIMARY_THREE", label: "Primary 3"},
        {value: "PRIMARY_FOUR", label: "Primary 4"},
        {value: "PRIMARY_FIVE", label: "Primary 5"},
        {value: "PRIMARY_SIX", label: "Primary 6"}
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8 font-sans">
                <div>
                    <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">Register a Child</h2>
                    <p className="text-sm text-gray-600 text-center">
                        This form helps us present each child’s story with clarity and dignity to potential sponsors.
                    </p>
                    {success && (
                        <p className="text-green-600 text-sm font-medium mt-4 transition-opacity duration-500 ease-in-out animate-fade-in">
                            ✅ Child’s profile submitted successfully! Redirecting…
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Child’s Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-green-700 border-b pb-1">👶 Child’s Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="firstName" value={formData.firstName} onChange={handleChange}
                                   placeholder="First Name" className="border rounded px-3 py-2 w-full text-sm"/>
                            <input name="middleName" value={formData.middleName} onChange={handleChange}
                                   placeholder="Middle Name (optional)"
                                   className="border rounded px-3 py-2 w-full text-sm"/>
                            <input name="lastName" value={formData.lastName} onChange={handleChange}
                                   placeholder="Last Name" className="border rounded px-3 py-2 w-full text-sm"/>
                            <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange}
                                   className="border rounded px-3 py-2 w-full text-sm"/>
                            <select name="gender" value={formData.gender} onChange={handleChange}
                                    className="border rounded px-3 py-2 w-full text-sm">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                            <select name="village" value={formData.village} onChange={handleChange}
                                    className="border rounded px-3 py-2 w-full text-sm">
                                {villages.map(v => (
                                    <option key={v} value={v}>{toTitleCase(v)}</option>
                                ))}
                            </select>
                            <select name="classLevel" value={formData.classLevel} onChange={handleChange}
                                    className="border rounded px-3 py-2 w-full text-sm">
                                {classLevels.map(level => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* ✅ Image Upload */}
                        <div className="mt-4">
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">Profile
                                Image</label>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {formData.profileImage && (
                                <img
                                    src={URL.createObjectURL(formData.profileImage)}
                                    alt="Preview"
                                    className="mt-4 w-32 h-32 object-cover rounded shadow"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label  htmlFor="responsiblePartyType" className="text-sm font-medium text-gray-700">Who is responsible for the
                                child?</label>
                            <select
                                id="responsiblePartyType"
                                name="responsiblePartyType"
                                value={formData.responsiblePartyType}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    responsiblePartyType: e.target.value.toUpperCase()
                                })}
                                className="border rounded px-3 py-2 w-full text-sm"
                                required>
                                <option value="PARENT">Parents</option>
                                <option value="GUARDIAN">Guardian</option>
                            </select>
                        </div>

                        <h3 className="text-lg font-semibold text-green-700 border-b pb-1">
                            {formData.responsiblePartyType === 'GUARDIAN' ? '🧑‍🏫 Guardian Information' : '👨‍👩‍👧 Parent Information'}
                        </h3>

                        {formData.responsiblePartyType === 'GUARDIAN' ? (
                            <GuardianFields formData={formData} setFormData={setFormData}/>
                        ) : (
                            <ParentFields formData={formData} setFormData={setFormData}
                                          handleParentChange={handleParentChange}/>
                        )}

                    </div>


                    {/* Story */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-green-700 border-b pb-1">📖 Story</h3>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleChange}
                            placeholder="Write a short story about the child’s dreams, personality, or background..."
                            className="border rounded px-3 py-2 w-full h-32 resize-none text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-all ${
                            isSubmitting
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                                </svg>
                                Submitting...
                            </div>
                        ) : (
                            'Submit Child’s Profile'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PupilForm;
