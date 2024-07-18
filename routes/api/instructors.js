import express from "express";
import { getAllInstructors } from "../../controllers/instructors/getInstructors.js";
import { createNewInstructor } from "../../controllers/instructors/createNewInstructor.js";
import { getInstructorById } from "../../controllers/instructors/getInstructorById.js";

const router = express.Router();

router.get("/", getAllInstructors);

router.get("/:id", getInstructorById);

router.post("/:id", createNewInstructor);

export { router };
