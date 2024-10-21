import express from "express";
import logger from "morgan";
import cors from "cors";
import { swagger } from "./utils/swagger.js";
import { apiErrorHandler } from "./utils/errors/api-error-handler.js";
import "./config/config-passport.js";

import { router as authRouter } from "./routes/api/auth.js";
import { router as instructorsRouter } from "./routes/api/instructors.js";
import { router as facilitiesRouter } from "./routes/api/objects.js";
import { router as eventsRouter } from "./routes/api/events.js";
import { router as upcomingEventsRouter } from "./routes/api/upcomingEvents.js";
import { router as searchRouter } from "./routes/api/search.js";
import { router as rateRouter } from "./routes/api/rate.js";

const app = express();
swagger(app);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/instructors", instructorsRouter);
app.use("/api/facilities", facilitiesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/upcoming", upcomingEventsRouter);
app.use("/api/search", searchRouter);
app.use("/api/rate", rateRouter);

app.use(apiErrorHandler);

export { app };
