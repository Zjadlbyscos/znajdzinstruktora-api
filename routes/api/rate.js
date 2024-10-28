import express from "express";
import { addRating } from "../../controllers/rating/addRating.js";
import { getInstructorRatings } from "../../controllers/rating/getInstructorRatings.js";

const router = express.Router();

router.get("/:id", getInstructorRatings);

router.post("/", addRating);

export { router };
