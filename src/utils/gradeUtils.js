// src/utils/gradeUtils.js
export const formatTerm = (term) => ({
    FIRST_TERM: "1st Term",
    SECOND_TERM: "2nd Term",
    THIRD_TERM: "3rd Term",
}[term] || term);


export const formatTermEnum = (term) => ({
    FIRST_TERM: "First-Term",
    SECOND_TERM: "Second-Term",
    THIRD_TERM: "Third-Term",
}[term] || term);


export const formatDescriptor = (desc) => ({
    EXCELLENT: "Excellent",
    VERY_GOOD: "Very Good",
    GOOD: "Good",
    FAIR: "Fair",
    POOR: "Poor",
    FAIL: "Fail",
    NOT_APPLICABLE: "N/A",
}[desc] || desc);

export const formatGradeLetter = (desc) =>
    desc === "NOT_APPLICABLE" ? "N/A" : desc;

export const formatAssessment = (type) => ({
    HOMEWORK: "Homework",
    EXAM: "Exam",
    CLASSWORK: "Classwork",
}[type] || type);


export const calculateGradeLetter = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    if (score >= 50) return "E";
    return "F";
};
