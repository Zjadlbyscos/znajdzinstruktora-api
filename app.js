import express from "express";
import logger from "morgan";
import cors from "cors";
import { swagger } from "./utils/swagger.js";
import { apiErrorHandler } from "./utils/errors/api-error-handler.js";
import "./config/config-passport.js";

import { router as authRouter } from "./routes/api/auth.js";
import { router as instructorsRouter } from "./routes/api/instructors.js";
import { router as objectsRouter } from "./routes/api/objects.js";

const app = express();
swagger(app);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/instructors", instructorsRouter);
app.use("/api/objects", objectsRouter);

app.use(apiErrorHandler);

export { app };
