import { useState, useEffect } from "react";
import axios from "axios";
import TermReportForm from "../termpayment/TermReportForm";

export default function PupilProfile({ pupilId }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [pupil, setPupil] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get(`/pupils/${pupilId}`).then(res => setPupil(res.data));
    axios.get(`/pupils/${pupilId}/reports`).then(res => setReports(res.data));
  }, [pupilId]);

  if (!pupil) return <p className="text-center mt-10">Loading pupil data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{pupil.fullName}</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded ${activeTab === "profile" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 rounded ${activeTab === "reports" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Reports
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-2 text-gray-700">
          <p><strong>Class:</strong> {pupil.classLevel}</p>
          <p><strong>Academic Year:</strong> {pupil.academicYear}</p>
          <p><strong>Gender:</strong> {pupil.gender}</p>
          <p><strong>Village:</strong> {pupil.village}</p>
          <p><strong>Story:</strong> {pupil.story}</p>
          <p><strong>Sponsored:</strong> {pupil.sponsored ? "Yes" : "No"}</p>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          {reports.length === 0 ? (
            <p className="text-gray-500">No reports yet for this pupil.</p>
          ) : (
            reports.map(report => (
              <div key={report.id} className="border p-4 rounded bg-gray-50">
                <p><strong>{report.term}</strong> ({report.date})</p>
                <p className="mt-2">{report.summary}</p>
                <p className="text-sm text-gray-500 mt-1">Teacher: {report.teacherName}</p>
              </div>
            ))
          )}

          {/* Admin-only: Add new report */}
          <TermReportForm pupilId={pupilId} />
        </div>
      )}
    </div>
  );
}
