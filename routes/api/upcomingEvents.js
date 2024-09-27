import express from "express";
import { getUpcomingEvents } from "../../controllers/events/getUpcomingEvents.js";
import { getInstructorUpcomingEvents } from "../../controllers/events/getInstructorUpcomingEvents.js";

const router = express.Router();

router.get("/", getUpcomingEvents);

router.get("/:id", getInstructorUpcomingEvents);

export { router };
