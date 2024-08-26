import { Event } from "../../schemas/events.schema.js";

export const getEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    return res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};
