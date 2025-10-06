import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditTermPaymentForm from "../termpayment/EditTermPaymentForm";

const PupilFullProfile = () => {
  const { id } = useParams();
  const [pupil, setPupil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPupil = async () => {
      try {
        const response = await axios.get(`/api/pupils/${id}`);
        setPupil(response.data);
      } catch (error) {
        console.error("Error fetching pupil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPupil();
  }, [id]);

  const handleTermUpdated = (updatedTerm) => {
    setPupil(prev => ({
      ...prev,
      payments: prev.payments.map(p => p.id === updatedTerm.id ? updatedTerm : p)
    }));
  };

  if (loading) return <div className="p-6 text-center text-indigo-600">Loading profile...</div>;
  if (!pupil) return <div className="p-6 text-center text-red-600">Pupil not found.</div>;

  const { firstName, middleName, lastName, dateOfBirth, parents, payments } = pupil;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-indigo-700">🎓 {firstName} {middleName} {lastName}</h2>

      {/* Personal Info */}
      <section className="bg-indigo-50 p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">Personal Information</h3>
        <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
      </section>

      {/* Parent Info */}
      <section className="bg-purple-50 p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">Parent Details</h3>
        {parents?.length > 0 ? parents.map((parent, index) => (
          <div key={index} className="mb-2">
            <p><strong>Name:</strong> {parent.name}</p>
            <p><strong>Phone:</strong> {parent.phone}</p>
            <p><strong>Email:</strong> {parent.email}</p>
            <p><strong>Relationship:</strong> {parent.relationship}</p>
          </div>
        )) : <p>No parent details available.</p>}
      </section>

      {/* Toggle View/Edit */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-600">Term Payments</h3>
        <button
          onClick={() => setEditMode(prev => !prev)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
        </button>
      </div>

      {/* Term Payments Section */}
      <section className="bg-green-50 p-4 rounded-md shadow space-y-6">
        {payments?.length > 0 ? payments.map(payment => (
          <div key={payment.id} className="bg-white p-4 rounded-md shadow">
            <h4 className="text-md font-semibold text-green-700 mb-2">
              Term {payment.termNumber} – {payment.classLevel}
            </h4>

            {editMode ? (
              <EditTermPaymentForm
                termPaymentId={payment.id}
                onUpdated={handleTermUpdated}
              />
            ) : (
              <div className="space-y-2">
                <p><strong>Total Paid:</strong> ₦{payment.totalPaid}</p>
                <p><strong>Expected Amount:</strong> ₦{payment.expectedAmount}</p>
                <p><strong>Fully Paid:</strong> {payment.fullyPaid ? "✅ Yes" : "❌ No"}</p>
              </div>
            )}
          </div>
        )) : <p>No payment records found.</p>}
      </section>
    </div>
  );
};

export default PupilFullProfile;
