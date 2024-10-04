import { Instructor } from "../../schemas/instructor.schema.js";

export const getAllInstructors = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const pageLimit = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * pageLimit;

    const instructors = await Instructor.find().skip(skip).limit(pageLimit);
    const totalInstructors = await Instructor.countDocuments();
    const totalPages = Math.ceil(totalInstructors / pageLimit);

    return res.status(200).json({
      instructors,
      totalInstructors,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error);
  }
};
