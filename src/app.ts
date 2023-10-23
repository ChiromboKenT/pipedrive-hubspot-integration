import "reflect-metadata";
import "reflect-metadata";
import express from "express";
import {ExceptionHandler} from "middlewares/ExceptionHandler";
import {container} from "container";
import dotenv from "dotenv";
import {registerRoutes} from "routes";

dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse the request body
app.use(express.urlencoded({extended: true}));
const router = registerRoutes(container);

app.use("api/v1", router);

//use ExceptionHandler Middleware
const exceptionHandler = container.get<ExceptionHandler>("ExceptionHandler");
app.use(exceptionHandler.handle);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
