import express from "express";
import { createNewEvent } from "../../controllers/events/createNewEvent.js";
import { getEventById } from "../../controllers/events/getEventById.js";
import { getEvents } from "../../controllers/events/getEvents.js";
import { removeEvent } from "../../controllers/events/deleteEvent.js";
import { getEventsByInstructor } from "../../controllers/events/getEventsByInstructor.js";
import { updateEventInfo } from "../../controllers/events/updateEventInfo.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/", getEvents);

router.get("/:eventId", getEventById);

router.get("/byInstructor/:instructorId", getEventsByInstructor);

router.delete("/:eventId", removeEvent);

router.patch("/:eventId", updateEventInfo);

export { router };
