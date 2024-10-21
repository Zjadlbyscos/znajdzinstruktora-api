import { addRatingSchema } from "../../schemas/rating.schema.js";
import { rateInstructor } from "../../services/rating.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const addRating = async (req, res, next) => {
  const validationResult = addRatingSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const { instructorId, userId, rating, comment } = req.body;

    const rate = await rateInstructor(instructorId, userId, rating, comment);

    if (rate.error) {
      return next(ApiError.conflict(rate.error));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      rate,
    });
  } catch (error) {
    next(error);
  }
};
