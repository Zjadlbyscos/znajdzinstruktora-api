import express from "express";
import { createNewEvent } from "../../controllers/events/createNewEvent.js";

const router = express.Router();

router.post("/", createNewEvent);

export { router };
