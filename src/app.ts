import "reflect-metadata";
import {ExceptionHandler} from "./middlewares/ExceptionHandler";
import express, {Request, Response, NextFunction} from "express";
import {container} from "./container";
import dotenv from "dotenv";
import {registerRoutes} from "./routes";
import TYPES from "./types";

dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse the request body
app.use(express.json());
const router = registerRoutes(container);

app.use("/api/v1", router);

// Use ExceptionHandler Middleware
const exceptionHandler = container.get<ExceptionHandler>(
  TYPES.ExceptionHandler
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  exceptionHandler.handle(err, req, res, next);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  process.exit(1);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
