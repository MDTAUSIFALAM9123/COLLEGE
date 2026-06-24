import { model } from "./gemini.service.js";

export const evaluateAndGenerateNextQuestion = async ({
  interviewRole,
  previousMessages,
  userAnswer,
}) => {
  const prompt = `
You are an experienced technical interviewer.

Role:
${interviewRole}

Previous Conversation:
${previousMessages}

Candidate Answer:
${userAnswer}

Evaluate the answer and decide what to ask next.

Return ONLY valid JSON.

{
  "technicalScore": 0-100,
  "communicationScore": 0-100,
  "confidenceScore": 0-100,
  "grammarScore": 0-100,
  "problemSolvingScore": 0-100,

  "feedback":"",

  "followUpQuestion":"",

  "moveToNextTopic": false
}
`;

  const result = await model.generateContent(prompt);

  const raw =
    result.response.text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  return JSON.parse(raw);
};

// final interview evaluation

export const evaluateFinalInterview = async ({
  interviewRole,
  conversation,
  skills,
  projects,
  experience,
  candidateLevel,
  targetRole,
}) => {

  const prompt = `
You are a senior technical interviewer.

Interview Role:
${interviewRole}

Full Interview Conversation:${conversation}

Evaluate candidate performance

Rating MUST be exactly one of:

POOR
AVERAGE
GOOD
EXCELLENT

Do not use any other value.

Candidate Skills:
${skills?.join(", ")}

Candidate Projects:
${projects?.join(", ")}

Candidate Experience:
${experience?.join(", ")}

Candidate Level:
${candidateLevel}

Recommended Role:
${targetRole}

Full Interview Conversation:
${conversation}

Instructions:
- Evaluate the candidate ONLY according to the technologies, projects and experience present in their resume.
- Do NOT evaluate based on technologies not mentioned in the resume.
- If the candidate's resume contains MySQL, C++, VB.NET etc, focus on those topics.
- Do NOT mention React, Node.js, System Design or other technologies unless they are present in the resume.
- Analyze technical depth, communication, confidence, grammar and problem solving.
- Provide realistic strengths and weaknesses.
- Generate actionable improvement tips.

Return ONLY valid JSON.

{
  "technicalScore":85,
  "communicationScore":80,
  "confidenceScore":78,
  "grammarScore":82,
  "problemSolvingScore":88,

  "overallScore":83,

  "rating":"GOOD",

  "strengths":[
    "..."
  ],

  "weaknesses":[
    "..."
  ],

  "improvementTips":[
    "..."
  ],

  "technicalAnalysis":"...",
  "communicationAnalysis":"...",
  "confidenceAnalysis":"...",
  "grammarAnalysis":"...",
  "problemSolvingAnalysis":"...",

  "overallFeedback":"...",
  "improvementPlan":"..."
}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().replace(/```json/g, "").replace(/```/g,"").trim();

  return JSON.parse(raw);
};