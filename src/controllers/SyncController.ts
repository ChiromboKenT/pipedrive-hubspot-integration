// SyncController.ts
import "reflect-metadata";
import {inject, injectable} from "inversify";
import {Request, Response, NextFunction} from "express";

import TYPES from "types";
import { ExceptionHandler } from "middlewares/ExceptionHandler";
import {HubSpotService} from "../services/HubSpotService";
import { PipedriveService } from "../services/PipedriveService";
import { Logger } from "middlewares/Logger";

@injectable()
export class SyncController {
  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.ExceptionHandler) private exceptionHandler: ExceptionHandler,
    @inject(TYPES.HubSpotService) private hubSpotService: HubSpotService,
    @inject(TYPES.PipedriveService) private pipedriveService: PipedriveService
  ) {}

  public syncData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.logger.log(
        "Initiating data synchronization between HubSpot and Pipedrive."
      );

      // Implement the logic to sync data between HubSpot and Pipedrive
      // This could involve fetching data from one service, transforming it, and sending it to the other
      await this.hubSpotService.syncWithPipedrive(this.pipedriveService);
      await this.pipedriveService.syncWithHubSpot(this.hubSpotService);

      this.logger.log("Data synchronization completed successfully.");
      res.json({message: "Data synchronization completed successfully."});
    } catch (error) {
      this.logger.error("Error during data synchronization", error);
      this.exceptionHandler.handle(error, req, res, next);
    }
  };
}
