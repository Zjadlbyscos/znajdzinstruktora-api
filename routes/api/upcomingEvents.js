import express from "express";
import { getUpcomingEvents } from "../../controllers/events/getUpcomingEvents.js";

const router = express.Router();

router.get("/", getUpcomingEvents);

export { router };
