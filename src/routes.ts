import TYPES from "./types";
import {HubSpotController} from "./controllers/HubSpotController";
import {PipeDriveController} from "./controllers/PipeDriveController";
import express, {Request, Response} from "express";
import {Container} from "inversify";

const router = express.Router();

function asyncHandler(fn: any) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export const registerRoutes = (container: Container) => {
  const hubspot = container.get<HubSpotController>(TYPES.HubSpotController);
  const pipeDrive = container.get<PipeDriveController>(
    TYPES.PipeDriveController
  );

  router.post(
    "/hubspot",
    asyncHandler((req: Request, res: Response) =>
      hubspot.handleWebhook(req, res)
    )
  );
  router.post(
    "/pipedrive",
    asyncHandler((req: Request, res: Response) =>
      pipeDrive.handleWebhook(req, res)
    )
  );

  return router;
};
