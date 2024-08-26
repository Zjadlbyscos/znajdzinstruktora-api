import { getEventsByInstructorId } from "../../services/event.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getEventsByInstructor = async (req, res, next) => {
  try {
    const { instructorId } = req.params;

    const events = await getEventsByInstructorId(instructorId);

    if (!events) {
      return next(ApiError.notFound("Events not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      events,
    });
  } catch (error) {
    next(error);
  }
};
