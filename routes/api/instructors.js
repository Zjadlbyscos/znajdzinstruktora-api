import express from "express";
import { getAllInstructors } from "../../controllers/instructors/getInstructors.js";
import { addInstructor } from "../../controllers/instructors/addInstructor.js";
import { getInstructorById } from "../../controllers/instructors/getInstructorById.js";

const router = express.Router();

router.get("/", getAllInstructors);

router.get("/:id", getInstructorById);

router.post("/:id", addInstructor);

export { router };
