import { ApiError } from "../../utils/errors/apiError.js";
import { getInstructorId } from "../../services/instructor.service.js";

export const getInstructorById = async (req, res, next) => {
  try {
    const { instructorId } = req.params;

    const instructor = await getInstructorId(instructorId);
    if (!instructor) {
      return next(ApiError.notFound("Instructor not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      instructor,
    });
  } catch (error) {
    next(error);
  }
};
