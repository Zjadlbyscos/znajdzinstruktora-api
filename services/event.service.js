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
  try {
    const event = await Event.findOne({ _id: id });
    return event;
  } catch (error) {
    console.error("Error getting event by id:", error);
  }
};

export const deleteEvent = async (eventId, _id) => {
  try {
    const eventDeletionResult = await Event.findByIdAndDelete(eventId);

    const instructorUpdateResult = await Instructor.updateOne(
      { instructorId: _id },
      { $pull: { events: eventId } }
    );

    return { eventDeletionResult, instructorUpdateResult };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Error deleting event");
  }
};

export const getEventsByInstructorId = async (instructorId) => {
  try {
    const events = await Event.find({ instructorId });

    return events;
  } catch (error) {
    console.error("Error getting events by instructor id:", error);
    throw new Error("Error getting events by instructor id");
  }
};
