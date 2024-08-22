import { createEventSchema } from "../../schemas/events.schema.js";
import { createEvent } from "../../services/event.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const createNewEvent = async (req, res, next) => {
  const validationResult = createEventSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const newEvent = await createEvent(req.body);
    if (newEvent.error) {
      return next(ApiError.conflict(newEvent.error));
    }

    return res.status(201).json({
      code: 201,
      status: "CREATED",
      ResponseBody: {
        newEvent,
      },
    });
  } catch (error) {
    next(error);
  }
};
