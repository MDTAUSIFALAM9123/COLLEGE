import { model } from "./gemini.service.js";

export const generateResumeQuestions = async (
  analysis
) => {

  const prompt = `
Generate 10 interview questions.

Skills:
${analysis.skills.join(", ")}

Projects:
${analysis.projects.join(", ")}

Experience:
${analysis.experience.join(", ")}

Candidate Level:
${analysis.candidateLevel}

Return ONLY JSON.

{
  "questions":[]
}
`;

  const result =
    await model.generateContent(
      prompt
    );

  const text =
    result.response.text();

  return JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
};