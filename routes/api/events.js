import express from "express";
import { createNewEvent } from "../../controllers/events/createNewEvent.js";
import { getEventById } from "../../controllers/events/getEventById.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/:id", getEventById);

export { router };
