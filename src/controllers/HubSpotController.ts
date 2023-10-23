import {inject, injectable} from "inversify";
import {Send} from "express-serve-static-core";
import {NextFunction, Request, Response} from "express";
import {CustomError} from "../middlewares/CustomError";
import {Logger} from "../middlewares/Logger";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

@injectable()
export class HubSpotController {
  constructor(@inject(Logger) private logger: Logger) {}

  public handleWebhook(req: TypedRequestBody<any>, res: TypedResponse<any>) {
    const body = req.body;
    if (!body) {
      throw new CustomError("Request has no body", 500);
    }
    this.logger.log(
      `[HubSpot] Received Event: ${JSON.stringify({
        type: "Added",
        name: body.objectType === "DEAL" ? "DEAL" : "CONTACT",
      })}`
    );

    this.logger.log(`[HubSpot] data: ${JSON.stringify(body.properties)}`);
    return res.status(200).json({
      message: "Success",
    });
  }
}
