import express from "express";

const router = express.Router();

import { getSearchedInstructors } from "../../controllers/search/getSearchedInstructors.js";

router.get("/", getSearchedInstructors);

export { router };
