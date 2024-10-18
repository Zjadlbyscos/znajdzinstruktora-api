import { Instructor } from "../../schemas/instructor.schema.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getInstructorsByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    const instructors = await Instructor.find({ city });

    if (!instructors) {
      return next(ApiError.notFound("Instructors not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,

      instructors,
    });
  } catch (error) {
    next(error);
  }
};
