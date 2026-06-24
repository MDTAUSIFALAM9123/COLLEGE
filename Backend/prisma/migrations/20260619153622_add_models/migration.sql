-- AlterTable
ALTER TABLE "GeneratedQuestion" ADD COLUMN     "skill" TEXT,
ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "InterviewAttempt" ADD COLUMN     "isResumeBased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resumeContext" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "atsScore" INTEGER,
ADD COLUMN     "candidateLevel" TEXT,
ADD COLUMN     "extractedText" TEXT,
ADD COLUMN     "recommendedRoles" TEXT,
ADD COLUMN     "resumeExperience" TEXT[],
ADD COLUMN     "resumeProjects" TEXT[],
ADD COLUMN     "resumeSkills" TEXT[],
ADD COLUMN     "resumeStrengths" TEXT[],
ADD COLUMN     "resumeWeaknesses" TEXT[];
