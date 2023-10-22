// container.ts
import "reflect-metadata"; // Import reflect-metadata at the top of your file
import {Container} from "inversify";
import TYPES from "types";
import { Logger } from "middlewares/Logger";
import { ExceptionHandler } from "middlewares/ExceptionHandler";

const container = new Container();

// Bind Logger
container.bind<Logger>(TYPES.Logger).to(Logger);

// Bind ExceptionHandler
container.bind<ExceptionHandler>(TYPES.ExceptionHandler).to(ExceptionHandler);

// You can also bind other services, controllers, etc. here
// Example: container.bind<SomeService>(TYPES.SomeService).to(SomeService);

export {container};
