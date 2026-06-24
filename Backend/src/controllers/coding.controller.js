import prisma from "../lib/prisma.js";

export const createCodingChallenge = async (req,res)=>{
  try{

    const {
      title,
      description,
      difficulty,
      starterCode,
      solution,
      testCases,
    } = req.body;

    // Validation 1
    if (!title || !difficulty || !testCases) {
      return res.status(400).json({
        success: false,
        message:
          "Title, difficulty and testCases are required",
      });
    }

    // Validation 2
    const validDifficulties = [
      "EASY",
      "MEDIUM",
      "HARD",
    ];

    if (
      !validDifficulties.includes(difficulty)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid difficulty",
      });
    }

    // Validation 3
    if (!Array.isArray(testCases)) {
      return res.status(400).json({
        success: false,
        message:
          "testCases must be an array",
      });
    }

    const challenge =
      await prisma.codingChallenge.create({
        data:{
          title,
          description,
          difficulty,
          starterCode,
          solution,
          testCases,
        },
      });

    return res.status(201).json({
      success:true,
      challenge,
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};
// get all coding challenges
export const getAllCodingChallenges =
async (req,res)=>{
  try{

    const challenges =
    await prisma.codingChallenge.findMany({
      orderBy:{
        createdAt:"desc",
      },
    });

    return res.status(200).json({
      success:true,
      challenges,
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

//get coding challange by id

export const getCodingChallengeById =
async (req,res)=>{
  try{

    const { id } = req.params;

    const challenge =
    await prisma.codingChallenge.findUnique({
      where:{ id },
    });

    if(!challenge){
      return res.status(404).json({
        success:false,
        message:"Challenge not found",
      });
    }

    return res.status(200).json({
      success:true,
      challenge,
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

// update coding question
export const updateCodingChallenge =
async (req,res)=>{
  try{

    const { id } = req.params;

    const challenge =
    await prisma.codingChallenge.update({
      where:{ id },
      data:req.body,
    });

    return res.status(200).json({
      success:true,
      challenge,
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

// delete coding challange

export const deleteCodingChallenge = async (req,res)=>{
  try{

    const { id } = req.params;

    await prisma.codingChallenge.delete({
      where:{ id }
    });

    return res.status(200).json({
      success:true,
      message:"Challenge deleted successfully"
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// submit code

export const submitCode = async (req,res)=>{
  try{

    const {
      challengeId,
      language,
      code
    } = req.body;

    const challenge =
      await prisma.codingChallenge.findUnique({
        where:{
          id: challengeId
        }
      });

    if(!challenge){
      return res.status(404).json({
        success:false,
        message:"Challenge not found"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Ready for Judge0",
      challenge
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};