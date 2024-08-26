import { getEventsForUser } from "../../services/upcomingEvents.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getUpcomingEvents = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return next(ApiError.badRequest("User ID is required"));
    }

    const events = await getEventsForUser(userId);

    if (!events || events.length === 0) {
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
