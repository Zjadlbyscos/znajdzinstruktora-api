import { Event } from "../../schemas/events.schema.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    if (!allEvents) {
      return next(ApiError.notFound("Events not found"));
    }
    return res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};
