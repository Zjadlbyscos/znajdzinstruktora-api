import { Event } from "../schemas/events.schema.js";

export const createEvent = async (data) => {
  try {
    const { _id } = data;

    const existingEvent = await Event.findOne({ _id });
    if (existingEvent) {
      return { error: "Event already exists" };
    }

    const event = new Event(data);
    console.log("Data", data);
    console.log("event", event);
    await event.save();

    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Error creating event");
  }
};
