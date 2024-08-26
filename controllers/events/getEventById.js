import { getEventId } from "../../services/event.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await getEventId(eventId);
    if (!event) {
      return next(ApiError.notFound("Event not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      event,
    });
  } catch (error) {
    next(error);
  }
};
