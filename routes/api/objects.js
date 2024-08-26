import express from "express";

const router = express.Router();

import { getAllFacilities } from "../../controllers/object/getAllFacilities.js";
import { getFacilityById } from "../../controllers/object/getFacilityById.js";

router.get("/", getAllFacilities);
router.get("/:id", getFacilityById);

export { router };
