import { useState } from "react";
import axios from "axios";

export default function TermReportForm() {
  const [formData, setFormData] = useState({
    pupilId: "",
    term: "",
    summary: "",
    date: "",
    teacherName: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("/term-reports", formData);
      setMessage("✅ Term report saved successfully.");
      setFormData({
        pupilId: "",
        term: "",
        summary: "",
        date: "",
        teacherName: ""
      });
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("⚠️ Report for this term already exists.");
      } else if (error.response?.status === 404) {
        setMessage("❌ Pupil not found.");
      } else {
        setMessage("🚨 Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Submit Term Report</h2>

      <label className="block mb-2 text-sm font-medium text-gray-600">Pupil ID</label>
      <input
        type="number"
        name="pupilId"
        value={formData.pupilId}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">Term</label>
      <select
        name="term"
        value={formData.term}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Term</option>
        <option value="TERM_ONE">Term One</option>
        <option value="TERM_TWO">Term Two</option>
        <option value="TERM_THREE">Term Three</option>
      </select>

      <label className="block mb-2 text-sm font-medium text-gray-600">Summary</label>
      <textarea
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        required
        rows="4"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Write a gentle summary of the pupil’s progress..."
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">Teacher Name</label>
      <input
        type="text"
        name="teacherName"
        value={formData.teacherName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Save Report
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
}
