import { Event } from "../schemas/events.schema.js";
import { Instructor } from "../schemas/instructor.schema.js";

export const createEvent = async (data) => {
  try {
    const event = new Event(data);

    const existingEvent = await Event.findOne(event._id);

    if (existingEvent) {
      return { error: "Event already exists" };
    }

    await event.save();

    const instructor = await Instructor.findById(data.instructorId);

    if (!instructor) {
      throw new Error("Instructor not found");
    }

    instructor.events.push(event._id);

    await instructor.save();

    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Error creating event");
  }
};

export const getEventId = async (id) => {
  const event = await Event.findOne({ _id: id });

  return event;
};

export const deleteEvent = async (eventId, instructorId) => {
  const result = await Event.findByIdAndDelete({
    _id: eventId,
    instructorId: instructorId,
  });
  return result;
};
