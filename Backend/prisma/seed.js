import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories
  const frontend = await prisma.interviewCategory.create({
    data: {
      name: "Frontend Development",
      description: "React, JavaScript, HTML, CSS interviews",
    },
  });

  const backend = await prisma.interviewCategory.create({
    data: {
      name: "Backend Development",
      description: "Node.js, Express, Database interviews",
    },
  });

  const dsa = await prisma.interviewCategory.create({
    data: {
      name: "DSA",
      description: "Data Structures and Algorithms",
    },
  });

  // Interviews
  const reactInterview = await prisma.interview.create({
    data: {
      title: "React Developer Interview",
      description: "React and Frontend concepts",
      level: "Intermediate",
      duration: 30,
      categoryId: frontend.id,
    },
  });

  const nodeInterview = await prisma.interview.create({
    data: {
      title: "Node.js Developer Interview",
      description: "Backend concepts and APIs",
      level: "Intermediate",
      duration: 30,
      categoryId: backend.id,
    },
  });

  // Questions
  await prisma.question.createMany({
    data: [
      {
        question: "What is Virtual DOM?",
        expectedAnswer:
          "Virtual DOM is a lightweight copy of the real DOM used by React.",
        difficulty: Difficulty.EASY,
        categoryId: frontend.id,
        interviewId: reactInterview.id,
      },
      {
        question: "What are React Hooks?",
        expectedAnswer:
          "Hooks allow functional components to use state and lifecycle methods.",
        difficulty: Difficulty.MEDIUM,
        categoryId: frontend.id,
        interviewId: reactInterview.id,
      },
      {
        question: "Explain useEffect hook.",
        expectedAnswer:
          "useEffect handles side effects in functional components.",
        difficulty: Difficulty.MEDIUM,
        categoryId: frontend.id,
        interviewId: reactInterview.id,
      },
      {
        question: "What is JWT?",
        expectedAnswer:
          "JSON Web Token is used for authentication and authorization.",
        difficulty: Difficulty.EASY,
        categoryId: backend.id,
        interviewId: nodeInterview.id,
      },
      {
        question: "Difference between SQL and NoSQL?",
        expectedAnswer:
          "SQL uses relational tables, NoSQL uses flexible schemas.",
        difficulty: Difficulty.MEDIUM,
        categoryId: backend.id,
        interviewId: nodeInterview.id,
      },
      {
        question: "What is middleware in Express.js?",
        expectedAnswer:
          "Middleware functions execute during request-response cycle.",
        difficulty: Difficulty.EASY,
        categoryId: backend.id,
        interviewId: nodeInterview.id,
      },
      {
        question: "What is a Binary Search Tree?",
        expectedAnswer:
          "A tree data structure where left child is smaller and right child is greater.",
        difficulty: Difficulty.MEDIUM,
        categoryId: dsa.id,
      },
      {
        question: "Explain Time Complexity.",
        expectedAnswer:
          "Time complexity measures algorithm efficiency with input size.",
        difficulty: Difficulty.EASY,
        categoryId: dsa.id,
      },
    ],
  });

  // Coding Challenges
  await prisma.codingChallenge.createMany({
    data: [
      {
        title: "Reverse String",
        description: "Reverse a given string",
        difficulty: Difficulty.EASY,
        starterCode:
          "function reverseString(str) {\n  // Write code\n}",
        solution:
          "function reverseString(str){ return str.split('').reverse().join(''); }",
        testCases: {
          input: "hello",
          output: "olleh",
        },
      },
      {
        title: "Palindrome Checker",
        description: "Check whether a string is palindrome",
        difficulty: Difficulty.MEDIUM,
        starterCode:
          "function isPalindrome(str) {\n  // Write code\n}",
        solution:
          "function isPalindrome(str){ return str===str.split('').reverse().join(''); }",
        testCases: {
          input: "madam",
          output: true,
        },
      },
      {
        title: "Two Sum",
        description: "Find indices of two numbers that add up to target",
        difficulty: Difficulty.HARD,
        starterCode:
          "function twoSum(nums, target) {\n  // Write code\n}",
        solution:
          "function twoSum(nums,target){ const map={}; for(let i=0;i<nums.length;i++){ const diff=target-nums[i]; if(map[diff]!==undefined) return [map[diff],i]; map[nums[i]]=i; }}",
        testCases: {
          input: [[2,7,11,15], 9],
          output: [0,1],
        },
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });