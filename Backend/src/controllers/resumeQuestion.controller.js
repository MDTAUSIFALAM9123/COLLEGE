import { generateResumeQuestions } from "../services/resumeQuestion.service.js";

export const generateResumeInterview =
async (req,res)=>{

 const { analysis } = req.body;

 const questions =
 await generateResumeQuestions(
   analysis
 );

 return res.json({
   success:true,
   questions
 });
}