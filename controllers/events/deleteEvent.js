import { ApiError } from "../../utils/errors/apiError.js";
import { deleteEvent } from "../../services/event.service.js";

export const removeEvent = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const { eventId } = req.params;

    const result = await deleteEvent(eventId, _id);

    if (!result) {
      return next(ApiError.conflict(`Event with id ${eventId} not found`));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      ResponseBody: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
