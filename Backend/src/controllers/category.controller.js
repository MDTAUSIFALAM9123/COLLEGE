import prisma from "../lib/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.interviewCategory.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            interviews: true,
            questions: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log("get categories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.interviewCategory.findUnique({
      where: { id },
      include: {
        interviews: {
          select: {
            id: true,
            title: true,
            level: true,
            duration: true,
          },
          orderBy: {
            title: "asc",
          },
        },
        questions: {
          select: {
            id: true,
            question: true,
            difficulty: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            interviews: true,
            questions: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("get category by id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// create category (admin)
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryName = typeof name === "string" ? name.trim() : "";

    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await prisma.interviewCategory.findFirst({
      where: {
        name: {
          equals: categoryName,
          mode: "insensitive",
        },
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await prisma.interviewCategory.create({
      data: {
        name: categoryName,
        description,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("create category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
