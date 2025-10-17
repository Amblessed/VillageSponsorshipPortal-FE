
import api from "../api/axios";

export async function generateTeacherComment(name, term, subjects, scores, descriptors) {
    try {
        const response = await api.post("/api/openai/pupil", {
            name,
            term,
            subjects,
            scores,
            descriptors,
        });

        return response.data.trim();
    } catch (error) {
        console.error("Error generating teacher comment:", error);
        throw new Error("Failed to generate teacher comment");
    }
}