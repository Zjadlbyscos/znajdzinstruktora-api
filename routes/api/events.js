import express from "express";
import { createNewEvent } from "../../controllers/events/createNewEvent.js";
import { getEventById } from "../../controllers/events/getEventById.js";
import { getEvents } from "../../controllers/events/getEvents.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/", getEvents);

router.get("/:id", getEventById);

export { router };
