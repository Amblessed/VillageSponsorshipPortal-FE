import React from "react";
import PropTypes from "prop-types";
import { classLevels, formatClassLabel } from "../utils/classLevelUtils";

export default function ClassSelector({ value, onChange, startingLevel = null }) {
    const filteredLevels = startingLevel
        ? classLevels.slice(classLevels.indexOf(startingLevel))
        : classLevels;

    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
            <option value="">Select Class</option>
            {filteredLevels.map((level) => (
                <option key={level} value={level}>
                    {formatClassLabel(level)}
                </option>
            ))}
        </select>
    );
}

ClassSelector.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    startingLevel: PropTypes.string, // optional
};
