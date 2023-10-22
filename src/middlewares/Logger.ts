import {injectable} from "inversify";
import * as winston from "winston";

@injectable()
export class Logger {
  private logger: winston.Logger;
  private isStackTraceEnabled: boolean;
  private appName: string;

  constructor() {
    this.isStackTraceEnabled = process.env.STACK_TRACE === "true";
    this.appName = process.env.APP_NAME || "Pipedrive-hubspot";

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: {app: this.appName},
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }

  public log(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public error(message: string, error?: Error): void {
    if (this.isStackTraceEnabled && error) {
      this.logger.error(`${message} - Stack: ${error.stack}`);
    } else {
      this.logger.error(message);
    }
  }
}
