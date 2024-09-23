import express from "express";

const router = express.Router();

import { getSearchedEvent } from "../../controllers/search/getSearchedEvent.js";

router.get("/", getSearchedEvent);

export { router };
