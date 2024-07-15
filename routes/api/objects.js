import express from "express";

const router = express.Router();

import { getAllObjects } from "../../controllers/object/getAllObjects.js";
import { getObjectById } from "../../controllers/object/getObjectById.js";

router.get("/", getAllObjects);
router.get("/:id", getObjectById);

export { router };
