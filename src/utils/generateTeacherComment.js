// utils/generateTeacherComment.js
import { Configuration, OpenAIApi } from "openai";

console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Store securely in .env
});
const openai = new OpenAIApi(configuration);

export async function generateTeacherComment(name, term, subjects, descriptors) {
    const prompt = `
You are a compassionate teacher writing a report card comment for ${name}.
Term: ${term}
Subjects: ${subjects.join(", ")}
Descriptors: ${descriptors.join(", ")}

Write a warm, sponsor-friendly comment in 2–3 sentences. Be honest but encouraging. Avoid repeating descriptors directly.
`;

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        temperature: 0,
        messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content.trim();
}
