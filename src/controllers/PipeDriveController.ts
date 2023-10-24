import {inject, injectable} from "inversify";
import {Logger} from "../middlewares/Logger";
import {CustomError} from "../middlewares/CustomError";
import {Send} from "express-serve-static-core";
import {Request, Response} from "express";
import TYPES from "../types";
import PipedriveEntity from "../entities/PipedriveEntity";
import {PipedriveService} from "../services/PipedriveService";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

@injectable()
export class PipeDriveController {
  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.PipedriveService) private pipeDriveService: PipedriveService
  ) {}

  public async handleWebhook(
    req: TypedRequestBody<any>,
    res: TypedResponse<any>
  ) {
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

    let result: any;
    try {
      if (body.meta?.object === "Person") {
        const PipeDriveContact = new PipedriveEntity("Contact", body.current);
        const contactData = PipeDriveContact.getContact();

        result = await this.pipeDriveService.syncWithHubSpot(
          "CONTACT",
          contactData
        );
      } else {
        const PipeDriveDeal = new PipedriveEntity("Deal", body.current);
        const dealData = PipeDriveDeal.getDeal();

        result = await this.pipeDriveService.syncWithHubSpot("DEAL", dealData);
      }

      this.logger.log(`[PipeDrive] data: ${JSON.stringify(body.current)}`);
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      throw new CustomError(
        "[PipeDrive] Error - Failed to handle webhook ",
        500,
        error
      );
    }
  }
}
