import { Instructor } from "../../schemas/instructor.schema.js";
import { upcomingInstructorEvents } from "../../services/upcomingEvents.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getInstructorUpcomingEvents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const pageLimit = Math.min(parseInt(limit), 50);

    const eventsData = await upcomingInstructorEvents(
      id,
      pageLimit,
      parseInt(page)
    );

    if (!eventsData.events || eventsData.events.length === 0) {
      return next(ApiError.notFound("Events not found"));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      ...eventsData,
    });
  } catch (error) {
    next(error);
  }
};
