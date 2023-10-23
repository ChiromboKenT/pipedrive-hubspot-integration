import {inject, injectable} from "inversify";
import {Logger} from "../middlewares/Logger";
import {NextFunction} from "express-serve-static-core";
import {CustomError} from "../middlewares/CustomError";
import {Send} from "express-serve-static-core";
import {Request, Response} from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

@injectable()
export class PipeDriveController {
  constructor(@inject(Logger) private logger: Logger) {}

  public handleWebhook(req: TypedRequestBody<any>, res: TypedResponse<any>) {
    const body = req.body;
    if (!body) {
      throw new CustomError("Request has no body", 500);
    }
    this.logger.log(
      `[PipeDrive] Received Event: ${JSON.stringify({
        type: body.meta?.action,
        name: body.meta?.object === "Person" ? "Contact" : "Deal",
      })}`
    );

    this.logger.log(`[PipeDrive] data: ${JSON.stringify(body.current)}`);
    return res.status(200).json({
      message: "Success",
    });
  }
}
