
export const classLevels = [
    "PRE_NURSERY",
    "NURSERY_ONE",
    "NURSERY_TWO",
    "NURSERY_THREE",
    "PRIMARY_ONE",
    "PRIMARY_TWO",
    "PRIMARY_THREE",
    "PRIMARY_FOUR",
    "PRIMARY_FIVE",
    "PRIMARY_SIX",
];

export const mapClassLabelToEnum = (label) => ({
    "Pre Nursery": "PRE_NURSERY",
    "Nursery 1": "NURSERY_ONE",
    "Nursery 2": "NURSERY_TWO",
    "Nursery 3": "NURSERY_THREE",
    "Primary 1": "PRIMARY_ONE",
    "Primary 2": "PRIMARY_TWO",
    "Primary 3": "PRIMARY_THREE",
    "Primary 4": "PRIMARY_FOUR",
    "Primary 5": "PRIMARY_FIVE",
    "Primary 6": "PRIMARY_SIX",
}[label] || "");




export const formatClassLabel = (value) => ({
    PRE_NURSERY: "Pre Nursery",
    NURSERY_ONE: "Nursery 1",
    NURSERY_TWO: "Nursery 2",
    NURSERY_THREE: "Nursery 3",
    PRIMARY_ONE: "Primary 1",
    PRIMARY_TWO: "Primary 2",
    PRIMARY_THREE: "Primary 3",
    PRIMARY_FOUR: "Primary 4",
    PRIMARY_FIVE: "Primary 5",
    PRIMARY_SIX: "Primary 6",
}[value] || value);


export const formatRelationship = (value) => ({
    UNCLE: "Uncle",
    AUNT: "Aunt",
    BROTHER: "Brother",
    SISTER: "Sister",
    NEIGHBOR: "Neighbor",
    COUSIN: "Cousin",
    GRANDMOTHER: "Grandmother",
    GRANDFATHER: "Grandfather",
}[value] || value);


export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
        if (n > 3 && n < 21) return `${n}th`;
        switch (n % 10) {
            case 1: return `${n}st`;
            case 2: return `${n}nd`;
            case 3: return `${n}rd`;
            default: return `${n}th`;
        }
    };

    return `${getOrdinal(day)} ${month}, ${year}`;
};