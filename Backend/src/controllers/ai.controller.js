// src/controllers/ai.controller.js

import { model } from "../services/gemini.service.js";

export const testGemini = async (req, res) => {
  try {
    const result = await model.generateContent(
      "Generate 3 Full Stack Developer interview questions"
    );

    res.json({
      success: true,
      response: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};