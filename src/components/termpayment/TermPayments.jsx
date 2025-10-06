import { useEffect, useState } from "react";
import axios from "axios";

const TermPayments = ({ pupilId }) => {
  const [termPayments, setTermPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get(`/api/pupils/${pupilId}/term-payments`);
        console.log(response.data);
        setTermPayments(response.data);
      } catch (error) {
        console.error("Error fetching term payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [pupilId]);

  const handleInstallmentAdded = (termId, newInstallment) => {
    setTermPayments(prev =>
      prev.map(term =>
        term.id === termId
          ? {
              ...term,
              installments: [...term.installments, newInstallment],
              totalPaid: term.totalPaid + newInstallment.amountPaid,
              fullyPaid: term.totalPaid + newInstallment.amountPaid >= term.expectedAmount,
            }
          : term
      )
    );
  };

  if (loading) return <div className="p-6 text-center text-indigo-600">Loading payments...</div>;

  return (
    <div className="space-y-6">
      {termPayments.map(term => (
        <div key={term.id} className="bg-green-50 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Term {term.termNumber} – {term.classLevel}
          </h3>
          <p><strong>Total Paid:</strong> ₦{term.totalPaid}</p>
          <p><strong>Fully Paid:</strong> {term.fullyPaid ? "✅ Yes" : "❌ No"}</p>

          <InstallmentList installments={term.installments} />
          <AddInstallmentForm termPaymentId={term.id} onAdded={inst => handleInstallmentAdded(term.id, inst)} />
        </div>
      ))}
    </div>
  );
};

const InstallmentList = ({ installments }) => (
  <div className="mt-4">
    <h4 className="text-md font-semibold text-gray-700 mb-2">Installments</h4>
    {installments.length === 0 ? (
      <p className="text-sm text-gray-500">No installments yet.</p>
    ) : (
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Amount Paid</th>
            <th className="px-4 py-2 text-left">Payment Date</th>
            <th className="px-4 py-2 text-left">Method</th>
          </tr>
        </thead>
        <tbody>
          {installments.map(inst => (
            <tr key={inst.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">₦{inst.amountPaid}</td>
              <td className="px-4 py-2 border-b">{inst.paymentDate}</td>
              <td className="px-4 py-2 border-b">{inst.paymentMethod || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const AddInstallmentForm = ({ termPaymentId, onAdded }) => {
  const [form, setForm] = useState({
    amountPaid: "",
    paymentDate: "",
    paymentMethod: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/term-payments/${termPaymentId}/installments`, form);
      onAdded(response.data);
      setForm({ amountPaid: "", paymentDate: "", paymentMethod: "" });
    } catch (error) {
      console.error("Installment creation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow space-y-4 mt-4">
      <h4 className="text-md font-semibold text-green-700">Add Installment</h4>
      <input
        name="amountPaid"
        type="number"
        placeholder="Amount Paid"
        value={form.amountPaid}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="paymentDate"
        type="date"
        value={form.paymentDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Method</option>
        <option value="Cash">Cash</option>
        <option value="Transfer">Transfer</option>
        <option value="POS">POS</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Save Installment
      </button>
    </form>
  );
};

export default TermPayments;
