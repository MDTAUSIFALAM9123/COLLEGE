import prisma from "../lib/prisma.js";
import { model } from "../services/gemini.service.js";
import { evaluateFinalInterview } from "../services/evaluation.service.js"

const normalizeGeneratedQuestions = (rawText) => {
  const cleanedText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed = [];

  if (cleanedText.startsWith("[")) {
    try {
      parsed = JSON.parse(cleanedText);
    } catch (error) {
      parsed = [];
    }
  }

  if (!Array.isArray(parsed)) {
    parsed = [];
  }

  if (parsed.length === 0) {
    const lines = cleanedText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    parsed = lines
      .map((line) => {
        const match = line.match(/"?question"?\s*[:\-]\s*"([^"]+)"/i);
        if (match) {
          return { question: match[1] };
        }

        const numericMatch = line.match(/^[0-9]+[.)]\s*(.+)$/);
        if (numericMatch) {
          return { question: numericMatch[1].trim() };
        }

        return null;
      })
      .filter(Boolean);
  }

  return parsed
    .map((item, index) => {
      const questionText =
        item?.question || item?.Question || item?.prompt || item?.text || "";

      return {
        question: String(questionText).trim(),
        expectedAnswer: item?.expectedAnswer
          ? String(item.expectedAnswer).trim()
          : null,
        difficulty: ["EASY", "MEDIUM", "HARD"].includes(
          String(item?.difficulty || "MEDIUM").toUpperCase(),
        )
          ? String(item.difficulty || "MEDIUM").toUpperCase()
          : "MEDIUM",
        sourceIndex: index,
      };
    })
    .filter((item) => item.question);
};

export const getInterviews = async (req, res) => {
  try {
const interviews = await prisma.interview.findMany({
  orderBy: {
    title: "asc",
  },
  include: {
    questions: true,        // ← ADD THIS
    category: {
      select: {
        id: true,
        name: true,
      },
    },
    _count: {
      select: {
        questions: true,
        attempts: true,
      },
    },
  },
});

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error("Get Interviews Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        questions: {
          select: {
            id: true,
            question: true,
            expectedAnswer: true,
            difficulty: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Get Interview By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create Interview (ADMIN)
export const createInterview = async (req, res) => {
  try {
    const { title, description, level, duration, categoryId } = req.body;
    const interviewTitle = typeof title === "string" ? title.trim() : "";
    const interviewLevel = typeof level === "string" ? level.trim() : "";
    const parsedDuration =
      duration === undefined || duration === null || duration === ""
        ? null
        : Number(duration);

    if (!interviewTitle || !interviewLevel || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title, level and categoryId are required",
      });
    }

    if (
      parsedDuration !== null &&
      (!Number.isInteger(parsedDuration) || parsedDuration <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Duration must be a positive integer",
      });
    }

    const category = await prisma.interviewCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const interview = await prisma.interview.create({
      data: {
        title: interviewTitle,
        description,
        level: interviewLevel,
        duration: parsedDuration,
        categoryId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// start interview

export const startInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interviewId,type } = req.body;
    console.log("TYPE=",type);

    const normalizedInterviewId =
      typeof interviewId === "string" ? interviewId.trim() : "";

    if (!normalizedInterviewId) {
      return res.status(400).json({
        success: false,
        message: "interviewId is required",
      });
    }

    const interview = await prisma.interview.findUnique({
      where: {
        id: normalizedInterviewId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log("USER SKILLS =", user.resumeSkills);
    console.log("USER PROJECTS= ", user.resumeProjects);
    console.log("USER LEVEL=",user.candidateLevel);
    let prompt;
    if(type === "resume"){

    prompt = `
    You are a senior technical interviewer.

    Generate exactly 5 personalized interview questions based on the candidate's resume.

    Candidate Skills:
    ${user.resumeSkills?.join(", ")}

    Projects:
    ${user.resumeProjects?.join(", ")}

    Experience:
    ${user.resumeExperience?.join(", ")}

    Candidate Level:
    ${user.candidateLevel}

    Strengths:
    ${user.resumeStrengths?.join(", ")}

    Target Role:
    ${user.recommendedRoles}

    Rules:
    - Questions MUST be based on the candidate's skills, projects and experience.
    - Ask technical questions related to technologies mentioned in the resume.
    - Ask project-specific questions.
    - Ask follow-up style questions that real interviewers ask.
    - Do NOT ask generic HR questions.
    - Do NOT ask behavioural questions.
    - Questions should feel like a real software engineering interview.
    - Mix EASY, MEDIUM and HARD questions.
    - Return ONLY valid JSON.
    - No markdown.
    - No explanation.

    Format:
    [
      {
        "question": "",
        "expectedAnswer": "",
        "difficulty": "MEDIUM"
      }
    ]
    `;


    }
    else{
      prompt = `
Generate exactly 5  unique interview questions.

Category: ${interview.category.name}
Level: ${interview.level}

Rules:
- Questions should be practical.
- Questions should be suitable for a real interview.
- Return ONLY valid JSON.
- Do not return markdown.
- Do not include explanation.
- Do not include code blocks.

Format:
[
  {
    "question": "What is React?",
    "expectedAnswer": "React is a JavaScript library used for building user interfaces.",
    "difficulty": "MEDIUM"
  }
]
`};

    const result = await model.generateContent(prompt);

    const rawText = result.response?.text?.() || "";

    console.log("Gemini Response:", rawText);

    const generatedQuestions = normalizeGeneratedQuestions(rawText);

    if (generatedQuestions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "AI did not generate valid questions.",
      });
    }

    // Every time create a NEW attempt
    const attempt = await prisma.interviewAttempt.create({
      data: {
        userId,
        interviewId: normalizedInterviewId,
        status: "STARTED",

        generatedQuestions: {
          create: generatedQuestions.map((q) => ({
            question: q.question,
            expectedAnswer: q.expectedAnswer,
            difficulty: q.difficulty,
          })),
        },
      },

      include: {
        generatedQuestions: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Interview started successfully",
      data: {
        attemptId: attempt.id,

        interview: {
          id: interview.id,
          title: interview.title,
          level: interview.level,
          duration: interview.duration,
          category: interview.category.name,
        },

        totalQuestions: attempt.generatedQuestions.length,

        questions: attempt.generatedQuestions.map((q) => ({
          id: q.id,
          question: q.question,
          difficulty: q.difficulty,
        })),
      },
    });
  } catch (error) {
    console.error("Start Interview Error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// get interview history
export const getInterviewHistory = async (req, res) => {
  try {
    const attempts = await prisma.interviewAttempt.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        interview: {
          select: {
            id: true,
            title: true,
            level: true,
          },
        },
      },

      orderBy: {
        startedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      attempts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//finish interview
export const finishInterview = async (
  req,
  res
) => {
  try {

    const { attemptId } = req.body;

    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: "attemptId is required",
      });
    }

    const attempt =
      await prisma.interviewAttempt.findUnique({
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
        message: "Attempt not found",
      });
    }

    const chats =
      await prisma.aIChat.findMany({
        where: {
          attemptId,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    const conversation =
      chats
        .map(
          (chat) =>
            `${chat.role}: ${chat.message}`
        )
        .join("\n");

    const data =
      await evaluateFinalInterview({
        interviewRole:
          attempt.interview.title,

        conversation,
      });
      console.log("attemptId:",attemptId);
      console.log("userId:",req.user.id);
      console.log("data:",data);

    await prisma.aIScore.upsert({
      where:{
        attemptId,
      },
      update: {

        technicalScore:
          data.technicalScore,

        communicationScore:
          data.communicationScore,

        confidenceScore:
          data.confidenceScore,

        grammarScore:
          data.grammarScore,

        problemSolvingScore:
          data.problemSolvingScore,
      },
      create:{
        userId: req.user.id,
        attemptId,
        technicalScore:
          data.technicalScore,

        communicationScore:
          data.communicationScore,

        confidenceScore:
          data.confidenceScore,

        grammarScore:
          data.grammarScore,

        problemSolvingScore:
          data.problemSolvingScore,

      },
    });

    await prisma.aIAnalysis.upsert({
      where:{
        attemptId,
      },
        update:{

        technicalAnalysis:
          data.technicalAnalysis,

        communicationAnalysis:
          data.communicationAnalysis,

        confidenceAnalysis:
          data.confidenceAnalysis,

        grammarAnalysis:
          data.grammarAnalysis,

        problemSolvingAnalysis:
          data.problemSolvingAnalysis,

        strengths:
          data.strengths,

        weaknesses:
          data.weaknesses,

        overallFeedback:
          data.overallFeedback,

        improvementPlan:
          data.improvementPlan,
      },
      create:{
        userId: req.user.id,
        attemptId,
        technicalAnalysis:
          data.technicalAnalysis,

        communicationAnalysis:
          data.communicationAnalysis,

        confidenceAnalysis:
          data.confidenceAnalysis,

        grammarAnalysis:
          data.grammarAnalysis,

        problemSolvingAnalysis:
          data.problemSolvingAnalysis,

        strengths:
          data.strengths,

        weaknesses:
          data.weaknesses,

        overallFeedback:
          data.overallFeedback,

        improvementPlan:
          data.improvementPlan,

      },
    });

    await prisma.interviewAttempt.update({
      where: {
        id: attemptId,
      },

      data: {
        status: "COMPLETED",

        completedAt:
          new Date(),

        overallScore:
          data.overallScore,

        technicalScore:
          data.technicalScore,

        communicationScore:
          data.communicationScore,

        confidenceScore:
          data.confidenceScore,

        grammarScore:
          data.grammarScore,

        problemSolvingScore:
          data.problemSolvingScore,

        rating:
          data.rating,

        feedback:
          data.overallFeedback,

        strengths:
          data.strengths,

        weaknesses:
          data.weaknesses,

        improvementTips:
          data.improvementTips,
      },
    });

    return res.status(200).json({
      success: true,

      message:
        "Interview completed",

      result: data,
    });

  } catch (error) {

    console.log(
      "Finish Interview Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};


