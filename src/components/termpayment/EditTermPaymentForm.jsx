import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api/axios";

const EditTermPaymentForm = ({ termPaymentId, termNumber, classLevel, onUpdated, onCancel }) => {

  const [form, setForm] = useState({
    totalPaid: "",
    fullyPaid: false
  });

  useEffect(() => {
    const fetchTerm = async () => {
      try {

        const res = await api.get(`/api/term-payments/${termPaymentId}`);
        setForm(res.data);
      } catch (err) {
        console.error("Error loading term payment:", err);
      }
    };
    fetchTerm();
  }, [termPaymentId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

    const formatClassLevel = (level) =>
        level.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());

    const [loading, setLoading] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("Submit button clicked");
        setLoading(true);
        try {
            const payload = {
                ...form,
                termNumber,
                classLevel
            };

            const res = await api.put(`/api/term-payments/${termPaymentId}`, payload);
            onUpdated(res.data);
            alert("Term payment updated successfully.");
        } catch (err) {
            console.error("Update failed:", err);
        }finally {
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow space-y-4">
      <h4 className="text-md font-semibold text-indigo-700">Edit Term Payment</h4>

        <input
            name="termNumber"
            value={`Term ${termNumber}`}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
        />

        <input
            name="classLevel"
            value={formatClassLevel(classLevel)}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
        />

      <input
        name="totalPaid"
        type="number"
        placeholder="Total Paid"
        value={form.totalPaid}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          name="fullyPaid"
          type="checkbox"
          checked={form.fullyPaid}
          onChange={handleChange}
        />
        <span>Fully Paid</span>
      </label>

      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          {loading ? "Saving..." : "Save Changes"}
      </button>

        <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
            Cancel
        </button>
    </form>
  );
};

EditTermPaymentForm.propTypes = {
    termPaymentId: PropTypes.number.isRequired,
    termNumber: PropTypes.number.isRequired,
    classLevel: PropTypes.string.isRequired,
    onUpdated: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default EditTermPaymentForm;
