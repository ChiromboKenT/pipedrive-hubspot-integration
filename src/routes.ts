import {HubSpotController} from "./controllers/HubSpotController";
import {PipeDriveController} from "./controllers/PipeDriveController";
import express from "express";
import {Container} from "inversify";

const router = express.Router();

export const registerRoutes = (container: Container) => {
  const hubspot = container.get<HubSpotController>("HubSpotController");
  const pipeDrive = container.get<PipeDriveController>("PipeDriveController");

  router.post("/hubspot", (req, res) => hubspot.handleWebhook(req, res));
  router.post("/pipedrive", (req, res) => pipeDrive.handleWebhook(req, res));

  return router;
};
