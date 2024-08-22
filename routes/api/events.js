import express from "express";
import { createNewEvent } from "../../controllers/events/createNewEvent.js";
import { getEventById } from "../../controllers/events/getEventById.js";
import { getEvents } from "../../controllers/events/getEvents.js";
import { removeEvent } from "../../controllers/events/deleteEvent.js";
import { getEventsByInstructor } from "../../controllers/events/getEventsByInstructor.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/", getEvents);

router.get("/:instructorId", getEventsByInstructor);

router.get("/:eventId", getEventById);

router.delete("/:eventId", removeEvent);

export { router };
