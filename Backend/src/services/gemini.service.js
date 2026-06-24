import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("API KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
});

export const analyzeResume =
async (resumeText) => {

  const prompt = `
Analyze this resume.

Return ONLY valid JSON.

{
  "skills": [],
  "projects": [],
  "experience": [],
  "atsScore": 0,
  "candidateLevel": "",
  "strengths": [],
  "weaknesses": [],
  "recommendedRoles": []
}

Resume:

${resumeText}
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