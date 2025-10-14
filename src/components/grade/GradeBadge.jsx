import React from 'react';

const getColor = (gradeLetter) => {
    switch (gradeLetter) {
        case 'A': return 'green';
        case 'B': return 'blue';
        case 'C': return 'orange';
        case 'D': return 'red';
        case 'F': return 'darkred';
        default: return 'gray';
    }
};

const GradeBadge = ({ gradeLetter }) => {
    const color = getColor(gradeLetter);

    return (
        <span style={{
            backgroundColor: color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
        }}>
      {gradeLetter}
    </span>
    );
};

export default GradeBadge;
