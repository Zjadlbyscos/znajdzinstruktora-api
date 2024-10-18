import express from "express";

import { getAllInstructors } from "../../controllers/instructors/getInstructors.js";
import { createNewInstructor } from "../../controllers/instructors/createNewInstructor.js";
import { getInstructorById } from "../../controllers/instructors/getInstructorById.js";
import { updateInstructorInfo } from "../../controllers/instructors/updateInstructorInfo.js";
import { upload } from "../../middlewares/upload.js";
import { getInstructorsByCity } from "../../controllers/instructors/getInstructorsByCity.js";

const router = express.Router();

router.get("/", getAllInstructors);

router.get("/:id", getInstructorById);

router.get("/city", getInstructorsByCity);

router.post("/:id", createNewInstructor);

router.patch("/:id", upload.single("image"), updateInstructorInfo);

export { router };
