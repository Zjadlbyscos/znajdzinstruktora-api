import { getRatings } from "../../services/rating.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getInstructorRatings = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await getRatings(id);

    if (instructor.error) {
      return next(ApiError.notFound(instructor.error));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      instructor,
    });
  } catch (error) {
    next(error);
  }
};
