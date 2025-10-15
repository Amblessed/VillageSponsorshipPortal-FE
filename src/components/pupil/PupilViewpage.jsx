import React, { useEffect, useState } from 'react';
import api from "../../api/axios";
import { useLocation } from 'react-router-dom';
import EditTermPaymentForm from "../termpayment/EditTermPaymentForm";
import GradeViewerModal from "../grade/GradeViewerModal";
import PupilProgressionTable from "../pupilprogression/PupilProgressionTable";
import formatClassLabel from "../../utils/classLevelUtils";

const useQuery = () => new URLSearchParams(useLocation().search);

const calculateAge = birthDate => {
    const birth = new Date(birthDate);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear();
};

const PupilViewPage = () => {
    const query = useQuery();
    const firstName = query.get('firstName');
    const lastName = query.get('lastName');
    const birthDate = query.get('birthDate');
    const [editingPaymentId, setEditingPaymentId] = useState(null);
    const [showPayments, setShowPayments] = useState(false);

    const [pupil, setPupil] = useState(null);
    const [progressionHistory, setProgressionHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showGradeViewer, setShowGradeViewer] = useState(false);
    const [showProgression, setShowProgression] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pupilRes = await api.get('/api/pupils/pupil', {
                    params: { firstName, lastName, birthDate }
                });
                console.log(pupilRes.data);
                setPupil(pupilRes.data);


                const historyRes = await api.get('/api/pupils/progression-history/pupil', {
                    params: { firstName, lastName, birthDate }
                });
                setProgressionHistory(historyRes.data);
            } catch (error) {
                console.error('Error fetching pupil or progression history:', error);
            } finally {
                setLoading(false);
            }
        };

        if (firstName && lastName && birthDate) {
            fetchData();
        }
    }, [firstName, lastName, birthDate]);

    const handleTermUpdated = (updatedTerm) => {
        setPupil(prev => ({
            ...prev,
            payments: prev.payments.map(p => p.id === updatedTerm.id ? updatedTerm : p)
        }));
    };

    if (loading) return <p className="text-center mt-12">Loading pupil details...</p>;
    if (!pupil) return <p className="text-center mt-12">Pupil not found.</p>;

    const getParentGuardianHeading = () => {
        if (pupil.parent) return "Parent Details";
        if (pupil.guardian) return "Guardian Details";
        return "Parent/Guardian Details";
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{`${pupil.firstName} ${pupil.middleName} ${pupil.lastName}`}</h1>

            {/* Pupil Photo and Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/api/pupils/photo?firstName=${encodeURIComponent(pupil.firstName)}&lastName=${encodeURIComponent(pupil.lastName)}&birthDate=${pupil.birthDate}`}
                    alt={`${pupil.firstName} ${pupil.lastName}`}
                    className="w-full max-w-xs md:w-64 md:h-64 object-cover rounded shadow"
                />
                <div className="flex-1 space-y-2">
                    <p><strong>Age:</strong> {`${calculateAge(pupil.birthDate)} year${calculateAge(pupil.birthDate) === 1 ? '' : 's'}`}</p>
                    <p><strong>Class:</strong> {formatClassLabel(pupil.classLevel)}</p>
                    <p><strong>Village:</strong> {pupil.village}</p>
                    <p><strong>Registration Date:</strong> {pupil.registrationDate}</p>
                    <p><strong>Sponsored:</strong> {pupil.sponsored ? 'Yes' : 'No'}</p>
                    <p className="mt-4 italic">"{pupil.story}"</p>
                </div>
            </div>

            {/* Parent/Guardian Details */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                {getParentGuardianHeading()}
            </h2>

            {pupil.parent && (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Father</h3>
                        <p><strong>Full Name:</strong> {pupil.parent.fatherFullName}</p>
                        <p><strong>Occupation:</strong> {pupil.parent.fatherOccupation}</p>
                        <p><strong>Phone:</strong> {pupil.parent.fatherPhone}</p>
                        <p><strong>Alive:</strong> {pupil.parent.fatherAlive ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="flex-1 bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Mother</h3>
                        <p><strong>Full Name:</strong> {pupil.parent.motherFullName}</p>
                        <p><strong>Occupation:</strong> {pupil.parent.motherOccupation}</p>
                        <p><strong>Phone:</strong> {pupil.parent.motherPhone}</p>
                        <p><strong>Alive:</strong> {pupil.parent.motherAlive ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="mt-6 space-y-2">
                        <p><strong>Number of Siblings:</strong> {pupil.parent.numberOfChildren - 1}</p>
                        <p><strong>Parents Separated:</strong> {pupil.parent.parentsDivorced ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            )}

            {!pupil.parent && pupil.guardian && (
                <div className="bg-white p-4 rounded shadow">
                    <p><strong>Full Name:</strong> {`${pupil.guardian.firstName} ${pupil.guardian.middleName ?? ''} ${pupil.guardian.lastName}`.trim()}</p>
                    <p><strong>Relationship:</strong> {pupil.guardian.relationship}</p>
                    <p><strong>Phone:</strong> {pupil.guardian.phoneNumber}</p>
                    <p><strong>Address:</strong> {pupil.guardian.address}</p>
                </div>
            )}

            {!pupil.parent && !pupil.guardian && (
                <p className="italic text-gray-600">No parent or guardian information available.</p>
            )}

            {/* Grade Viewer Toggle */}
            <div className="flex justify-between items-center mt-10 mb-4">
                <h3 className="text-lg font-semibold text-purple-600">Grades</h3>
                <button
                    onClick={() => setShowGradeViewer(prev => !prev)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {showGradeViewer ? "Hide" : "Show"}
                </button>
            </div>

            {/* Grade Viewer Modal */}
            {showGradeViewer && (
                <GradeViewerModal
                    firstName={pupil.firstName}
                    lastName={pupil.lastName}
                    birthDate={pupil.birthDate}
                    classLevel={pupil.classLevel}
                    onClose={() => setShowGradeViewer(false)}
                />
            )}

            <div className="flex justify-between items-center mt-10 mb-4">
                <h3 className="text-lg font-semibold text-indigo-600">Class Progression</h3>
                <button
                    onClick={() => setShowProgression(prev => !prev)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {showProgression ? "Hide" : "Show"}
                </button>
            </div>

            {showProgression && (
                <PupilProgressionTable progressionHistory={progressionHistory} />
            )}

            {/* Term Payments */}
            <div className="flex justify-between items-center mt-10 mb-4">
                <h3 className="text-lg font-semibold text-green-600">Term Payments</h3>
                <button
                    onClick={() => setShowPayments(prev => !prev)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {showPayments ? "Hide" : "Show"}
                </button>
            </div>

            {/* Term Payments Section */}
            {showPayments && (
                <section className="bg-green-50 p-4 rounded-md shadow space-y-6">
                    {pupil.payments?.length > 0 ? pupil.payments.map(payment => (
                        <div key={payment.id} className="bg-white p-4 rounded-md shadow">
                            <h4 className="text-md font-semibold text-green-700 mb-2">
                                Term {payment.termNumber} – {payment.classLevel}
                            </h4>

                            {editingPaymentId === payment.id ? (
                                <EditTermPaymentForm
                                    termPaymentId={payment.id}
                                    termNumber={payment.termNumber}
                                    classLevel={payment.classLevel}
                                    onCancel={() => setEditingPaymentId(null)}
                                    onUpdated={(updated) => {
                                        handleTermUpdated(updated);
                                        setEditingPaymentId(null);
                                    }}
                                />
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <p><strong>Total Paid:</strong> ₦{payment.totalPaid}</p>
                                        <p><strong>Expected Amount:</strong> ₦{payment.expectedAmount}</p>
                                        <p><strong>Fully Paid:</strong> {payment.fullyPaid ? "✅ Yes" : "❌ No"}</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingPaymentId(payment.id)}
                                        className="mt-2 text-sm text-blue-600 hover:underline"
                                    >
                                        ✏️ Edit Payment
                                    </button>
                                </>
                            )}
                        </div>
                    )) : <p>No payment records found.</p>}
                </section>
            )}



            <div className="mt-8">
                <a href="/admin/pupils" className="text-green-600 hover:text-green-800">← Back to Pupils</a>
            </div>
        </div>
    );
};

export default PupilViewPage;
