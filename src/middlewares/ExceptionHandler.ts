import {CustomError} from "./CustomError";
import {inject, injectable} from "inversify";
import {Request, Response, NextFunction} from "express";
import {Logger} from "./Logger";
import TYPES from "../types";

@injectable()
export class ExceptionHandler {
  constructor(@inject(TYPES.Logger) private logger: Logger) {}

  public handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof CustomError) {
      // Handle custom errors
      this.logger.error(err.message, err.data);
      res.status(err.statusCode).json({
        status: "error",
        message: err.message,
        data: err.data,
      });
    } else {
      // Handle all other errors
      this.logger.error(err.name, err);
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }

    // If you have other error-handling middleware after this, call next.
    // Otherwise, you can omit this.
    next(err);
  }
}
