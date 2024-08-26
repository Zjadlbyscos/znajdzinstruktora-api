import { updateEvent } from "../../services/event.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const updateEventInfo = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    const { eventId } = req.params;

    const updatedEvent = await updateEvent(eventId, updateData);

    if (updatedEvent.error) {
      return next(ApiError.conflict(updatedEvent.error));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      ResponseBody: {
        updatedEvent,
      },
    });
  } catch (error) {
    next(error);
  }
};
