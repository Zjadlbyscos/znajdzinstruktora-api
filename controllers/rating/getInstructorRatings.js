import { getRatings } from "../../services/rating.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getInstructorRatings = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rating = await getRatings(id);

    if (!rating) {
      return next(ApiError.notFound(rating.error));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      rating,
    });
  } catch (error) {
    next(error);
  }
};
