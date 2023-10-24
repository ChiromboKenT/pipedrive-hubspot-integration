import {inject, injectable} from "inversify";
import {Send} from "express-serve-static-core";
import {Request, Response} from "express";
import {CustomError} from "../middlewares/CustomError";
import {Logger} from "../middlewares/Logger";
import TYPES from "../types";
import {HubSpotService} from "../services/HubSpotService";
import HubSpotEntity from "../entities/HubSpotEntity";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

@injectable()
export class HubSpotController {
  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.HubSpotService) private hubSpotService: HubSpotService
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
      `[HubSpot] Received Event: ${JSON.stringify({
        type: "Added",
        name: body.objectType === "DEAL" ? "DEAL" : "CONTACT",
      })}`
    );

    let result: any;
    try {
      if (body.objectType !== "DEAL") {
        const HubSpotContact = new HubSpotEntity("Contact", body.properties);
        const contactData = HubSpotContact.getContact();

        result = await this.hubSpotService.syncWithPipedrive(
          "CONTACT",
          contactData
        );
        this.logger.debug(`[Hubspot] Response sync contact : ${result}`);
      } else {
        const hubspotDeal = new HubSpotEntity("Deal", body.properties);
        const dealData = hubspotDeal.getDeal();

        result = await this.hubSpotService.syncWithPipedrive("DEAL", dealData);
        this.logger.debug(`[Hubspot] Response sync deal : ${result}`);
      }
      if (!result) {
        return res.status(500).json({
          message: "Failed to Sync data",
        });
      }
      this.logger.log(`[HubSpot] data: ${JSON.stringify(body.properties)}`);
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      throw new CustomError(
        "[HubSpot] Error - Failed to handle webhook ",
        500,
        error
      );
    }
  }
}

