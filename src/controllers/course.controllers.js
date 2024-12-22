import courseModels from "../models/course.models";

const addCourse = async (req, res) => {
  try {
    const { name, duration } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    // Create course
    const course = await courseModels.create({ name, duration });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCourse = async (req, res) => {
  try {
    // Fetch all courses and populate enrolledStudents field
    const courses = await courseModels.find({}).populate("enrolledStudents");

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error in getCourse:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addCourse, getCourse };
