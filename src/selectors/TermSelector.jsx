import React from "react";
import PropTypes from "prop-types";
import { formatTerm } from "../utils/gradeUtils";

const termOptions = ["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"];

export default function TermSelector({ value, onChange, includeAll = false }) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
            <option value="">Select Term</option>
            {includeAll && <option value="ALL">All Terms</option>}
            {termOptions.map((term) => (
                <option key={term} value={term}>
                    {formatTerm(term)}
                </option>
            ))}
        </select>
    );
}

TermSelector.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    includeAll: PropTypes.bool,
};
