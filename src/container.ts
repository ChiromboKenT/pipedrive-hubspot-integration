// container.ts
import "reflect-metadata"; // Import reflect-metadata at the top of your file
import {Container} from "inversify";
import TYPES from "./types";
import {Logger} from "./middlewares/Logger";
import {ExceptionHandler} from "./middlewares/ExceptionHandler";
import {HubSpotController} from "./controllers/HubSpotController";
import {PipeDriveController} from "./controllers/PipeDriveController";
import {HubSpotService} from "./services/HubSpotService";
import {PipedriveService} from "./services/PipedriveService";

const container = new Container();

// Bind Logger
container.bind<Logger>(TYPES.Logger).to(Logger);

// Bind ExceptionHandler
container.bind<ExceptionHandler>(TYPES.ExceptionHandler).to(ExceptionHandler);

//Bind Controllers
container
  .bind<HubSpotController>(TYPES.HubSpotController)
  .to(HubSpotController);
container
  .bind<PipeDriveController>(TYPES.PipeDriveController)
  .to(PipeDriveController);

//Bind Services
container.bind<HubSpotService>(TYPES.HubSpotService).to(HubSpotService);
container.bind<PipedriveService>(TYPES.PipedriveService).to(PipedriveService);




export {container};
