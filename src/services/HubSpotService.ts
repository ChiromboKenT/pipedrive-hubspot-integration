// HubSpotService.ts
import "reflect-metadata";
import {injectable, inject} from "inversify";
import axios from "axios";
import TYPES, {HubSpotContact, HubSpotDeal} from "../types";
import {Logger} from "../middlewares/Logger";
import {CustomError} from "../middlewares/CustomError";

@injectable()
export class HubSpotService {
  private readonly pipeDriveApiURL = process.env.PIPEDRIVE_URL;
  private readonly pipeDriveApiToken = process.env.PIPEDRIVE_API_TOKEN;

  constructor(@inject(TYPES.Logger) private logger: Logger) {}

  public async syncWithPipedrive(
    type: "CONTACT" | "DEAL",
    hubspotData: any
  ): Promise<boolean> {
    try {
      this.logger.log("[HubSpot] Syncing data to PipeDrive");
      this.logger.log("Transforming Hubspot data for PipeDrive");

      if (type === "CONTACT") {
        const transformedContactData = this.mapContact(
          hubspotData as HubSpotContact
        );
        const result = this.createContact(transformedContactData);

        this.logger.debug(`[Hubspot] Response - Contact : ${result}`);
      } else {
        const transformedDealData = this.mapDeal(hubspotData as HubSpotDeal);
        const result = this.createDeal(transformedDealData);

        this.logger.debug(`[Hubspot] Response - Contact : ${result}`);
      }

      this.logger.log("HubSpot data synced with Pipedrive successfully");
      return true;
    } catch (error) {
      this.logger.error("Error syncing HubSpot data with Pipedrive", error);
      throw error;
    }
  }

  private mapContact(hubspotContact: HubSpotContact): any {
    try {
      return {
        name: `${hubspotContact.firstName} ${hubspotContact.lastName}`,
        email: hubspotContact.email,
      };
    } catch (error) {
      throw new CustomError(
        "[HubSpot] Failed to transform PipeDrive data - Contact",
        500,
        error
      );
    }
  }

  private mapDeal(hubspotDeal: HubSpotDeal): any {
    try {
      return {
        title: hubspotDeal.dealName,
        user_id: Number(hubspotDeal.ownerId),
      };
    } catch (error) {
      throw new CustomError(
        "[HubSpot] Failed to transform PipeDrive data - Deal",
        500,
        error
      );
    }
  }

  private async createContact(data: any): Promise<void> {
    try {
      this.logger.log("[HubSpot] Sending contact data to PipeDrive");
      return await axios.post(
        `${this.pipeDriveApiURL}/persons?api_token=${this.pipeDriveApiToken}`,
        data,
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      throw new CustomError(
        "[HubSpot] Failed to create contact in PipeDrive",
        501,
        error
      );
    }
  }
  private async createDeal(data: any): Promise<void> {
    this.logger.log("[HubSpot] Sending deal data to PipeDrive");
    try {
      return await axios.post(
        `${this.pipeDriveApiURL}/deals?api_token=${this.pipeDriveApiToken}`,
        data,
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      throw new CustomError(
        "[HubSpot] Failed to create deal in PipeDrive",
        501,
        error
      );
    }
  }
}
