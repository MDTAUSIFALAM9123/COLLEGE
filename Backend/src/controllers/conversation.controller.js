import prisma from "../lib/prisma.js";
import { model } from "../services/gemini.service.js";

const extractJsonString = (text) => { 
  if (!text || typeof text !== "string") return "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }

  return cleaned;
};

export const respondInterview = async (req, res) => {
  try {
    const { attemptId, userAnswer } = req.body;

    if (!attemptId || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: "attemptId and userAnswer are required",
      });
    }

    // Get Interview Attempt

    const attempt = await prisma.interviewAttempt.findUnique({
      where: {
        id: attemptId,
      },

      include: {
        interview: true,
      },
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Interview attempt not found",
      });
    }

    // Save User Message

    await prisma.aIChat.create({
      data: {
        userId: req.user.id,
        attemptId,

        role: "USER",

        message: userAnswer,
      },
    });

    // Fetch Chat History

    const history = await prisma.aIChat.findMany({
      where: {
        attemptId,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    const previousMessages = history
      .map((msg) => `${msg.role}: ${msg.message}`)
      .join("\n");

    // Gemini Prompt

    const prompt = `
You are a professional interviewer.

Interview Role:
${attempt.interview.title}

Conversation History:
${previousMessages}

Latest Candidate Answer:
${userAnswer}

Evaluate the answer and continue the interview.

Return ONLY JSON.

{
  "technicalScore":80,
  "communicationScore":75,
  "confidenceScore":70,
  "grammarScore":78,
  "problemSolvingScore":82,

  "feedback":"Good answer",

  "followUpQuestion":"Why did you choose Redux Toolkit?",

  "moveToNextTopic":false
}
`;

    const result = await model.generateContent(prompt);

    const rawText = result.response?.text?.() || "";
    const jsonText = extractJsonString(rawText);

    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (parseError) {
      console.error(
        "AI JSON parse error:",
        parseError,
        "raw response:",
        rawText,
      );

      return res.status(502).json({
        success: false,
        message: "AI returned invalid JSON. Please try again.",
        rawResponse: rawText,
      });
    }

    const followUpQuestion =
      data.followUpQuestion?.trim() ||
      "Thank you for your answer. Let's continue the interview.";

    await prisma.aIChat.create({
      data: {
        userId: req.user.id,
        attemptId,
        role: "AI",
        message: followUpQuestion,
      },
    });

    return res.status(200).json({
      success: true,

      data,
    });
  } catch (error) {
    console.log("Respond Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
