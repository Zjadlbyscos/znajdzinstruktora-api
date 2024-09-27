import { Instructor } from "../../schemas/instructor.schema.js";
import { upcomingInstructorEvents } from "../../services/upcomingEvents.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getInstructorUpcomingEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const events = await upcomingInstructorEvents(id);

    if (!events) {
      return next(ApiError.notFound("Events not found"));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      events,
    });
  } catch (error) {
    next(error);
  }
};
