import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
    formatTerm,
    formatDescriptor,
    formatGradeLetter,
    formatAssessment, formatTermEnum,
} from "./gradeUtils";
import { formatClassLabel} from "./classLevelUtils";
import { generateTeacherComment } from "./generateTeacherComment";

pdfMake.vfs = pdfFonts.vfs;


const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
};

export async function generateTermReportPDF(grades, pupilInfo, term) {
    const normalizedClass = formatClassLabel(pupilInfo.classLevel);
    const allTerms = ["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"];
    const name = `${pupilInfo.firstName} ${pupilInfo.lastName}`;
    const termLabel = formatTerm(term);

    let comment = "";
    let groupedContent = [];

    if (term === "ALL") {
        const allTermGrades = grades.filter(
            (g) => g.classLevel === normalizedClass
        );
        const subjects = [...new Set(allTermGrades.map((g) => g.subject))];
        const descriptors = [...new Set(allTermGrades.map((g) => g.descriptor))];
        const scores = [...new Set(allTermGrades.map((g) => g.scores))];
        comment = await generateTeacherComment(name, "All Terms", subjects, scores, descriptors);

        groupedContent = allTerms.flatMap((t) => {
            const termGrades = grades
                .filter((g) => g.classLevel === normalizedClass && g.term === formatTermEnum(t))
                .sort((a, b) => a.subject.localeCompare(b.subject));


            return [
                { text: formatTerm(t), style: "subheader", margin: [0, 10, 0, 5] },
                termGrades.length === 0
                    ? { text: "No grades available for this term.", italics: true }
                    : {
                        table: {
                            headerRows: 1,
                            widths: ["*", "*", "auto", "auto", "*"],
                            body: [
                                [
                                    { text: "Subject", style: "tableHeader" },
                                    { text: "Type", style: "tableHeader" },
                                    { text: "Score", style: "tableHeader" },
                                    { text: "Grade", style: "tableHeader" },
                                    { text: "Descriptor", style: "tableHeader" },
                                ],
                                ...termGrades.map((g, i) => [
                                    { text: g.subject, fillColor: i % 2 ? "#F3F4F6" : null, alignment: "center"},
                                    { text: formatAssessment(g.assessmentType), fillColor: i % 2 ? "#F3F4F6" : null, alignment: "center"},
                                    { text: g.score.toString(), fillColor: i % 2 ? "#F3F4F6" : null, alignment: "center"},
                                    { text: formatGradeLetter(g.gradeLetter), fillColor: i % 2 ? "#F3F4F6" : null, alignment: "center"},
                                    { text: formatDescriptor(g.descriptor), fillColor: i % 2 ? "#F3F4F6" : null, alignment: "center"},
                                ]),
                            ],
                        },
                        layout: {
                            fillColor: (rowIndex) => (rowIndex === 0 ? "#4F46E5" : null),
                            hLineColor: "#ccc",
                            vLineColor: "#ccc",
                        },
                    },
            ];
        });
    } else {
        const termGrades = grades
            .filter((g) => g.classLevel === normalizedClass && g.term === term)
            .sort((a, b) => a.subject.localeCompare(b.subject));

        const subjects = [...new Set(termGrades.map((g) => g.subject))];
        const scores = [...new Set(termGrades.map((g) => g.scores))];
        const descriptors = [...new Set(termGrades.map((g) => g.descriptor))];
        comment = await generateTeacherComment(name, termLabel, subjects, scores, descriptors);

        groupedContent = [
            { text: formatTerm(term), style: "subheader", margin: [0, 10, 0, 5] },
            termGrades.length === 0
                ? { text: "No grades available for this term.", italics: true }
                : {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*", "auto", "auto", "*", "*"],
                        body: [
                            [
                                { text: "Subject", style: "tableHeader" },
                                { text: "Type", style: "tableHeader" },
                                { text: "Score", style: "tableHeader" },
                                { text: "Grade", style: "tableHeader" },
                                { text: "Descriptor", style: "tableHeader" },
                            ],
                            ...termGrades.map((g, i) => [
                                { text: g.subject, fillColor: i % 2 ? "#F3F4F6" : null },
                                { text: formatAssessment(g.assessmentType), fillColor: i % 2 ? "#F3F4F6" : null },
                                { text: g.score.toString(), fillColor: i % 2 ? "#F3F4F6" : null },
                                { text: formatGradeLetter(g.gradeLetter), fillColor: i % 2 ? "#F3F4F6" : null },
                                { text: formatDescriptor(g.descriptor), fillColor: i % 2 ? "#F3F4F6" : null },
                            ]),
                        ],
                    },
                    layout: {
                        fillColor: (rowIndex) => (rowIndex === 0 ? "#4F46E5" : null),
                        hLineColor: "#ccc",
                        vLineColor: "#ccc",
                    },
                },
        ];
    }

    const docDefinition = {
        content: [
            {
                text: "St. Damian Nursery and Primary School, Amandugba",
                style: "schoolName",
            },
            {
                text: `Academic Report – ${term === "ALL" ? "Full Academic Year" : termLabel}`,
                style: "header",
            },
            {
                canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
                margin: [0, 5, 0, 10],
            },
            {
                columns: [
                    { width: "*", text: `Name: ${pupilInfo.firstName} ${pupilInfo.lastName}` },
                    { width: "*", text: `Date of Birth: ${formatBirthDate(pupilInfo.birthDate)}` },
                ],
            },
            {
                columns: [
                    { width: "*", text: `Class: ${formatClassLabel(pupilInfo.classLevel)}` },
                    { width: "*", text: `Term: ${term === "ALL" ? "1st – 3rd Terms" : termLabel}` },
                ],
            },
            ...groupedContent,
            {
                text: [
                    { text: "Teacher's Comment: ", bold: true },
                    { text: comment }
                ],
                margin: [0, 20, 0, 0]
            },
            {
                columns: [
                    {
                        width: "*",
                        stack: [
                            { text: "____________________", alignment: "center" },
                            { text: "Teacher", alignment: "center", margin: [0, 4, 0, 0] }
                        ],
                        margin: [0, 30, 0, 0]
                    },
                    {
                        width: "*",
                        stack: [
                            { text: "____________________", alignment: "center" },
                            { text: "Head of School", alignment: "center", margin: [0, 4, 0, 0] }
                        ],
                        margin: [0, 30, 0, 0]
                    }
                ],
            },
        ],
        styles: {
            schoolName: {
                fontSize: 20,
                bold: true,
                alignment: "center",
                color: "#1E3A8A",
                margin: [0, 0, 0, 8],
            },
            header: {
                fontSize: 16,
                bold: true,
                alignment: "center",
                color: "#4F46E5",
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 14,
                bold: true,
                color: "#1E40AF",
            },
            tableHeader: {
                bold: true,
                color: "#FFFFFF",
                fillColor: "#1D4ED8",
                alignment: "center",
            }
            /*tableHeader: {
                bold: true,
                color: "white",
                fillColor: "#4F46E5",
                alignment: "center",
            },*/
        },
    };

    const filename = `${pupilInfo.firstName}_${term}_Report.pdf`;
    pdfMake.createPdf(docDefinition).download(filename);
}
