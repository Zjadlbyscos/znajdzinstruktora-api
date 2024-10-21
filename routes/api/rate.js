import express from "express";
import { addRating } from "../../controllers/rating/addRating.js";

const router = express.Router();

router.post("/", addRating);

export { router };
