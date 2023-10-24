// PipedriveService.ts
import "reflect-metadata";
import {injectable, inject} from "inversify";
import axios from "axios";
import TYPES, {PipeDriveContact, PipeDriveDeal} from "../types";
import {Logger} from "../middlewares/Logger";
import {CustomError} from "../middlewares/CustomError";
import {Client as HubSpotClient} from "@hubspot/api-client";

@injectable()
export class PipedriveService {
  private hubspotClient: HubSpotClient;

  constructor(@inject(TYPES.Logger) private logger: Logger) {
    this.hubspotClient = new HubSpotClient({
      accessToken: process.env.HUBSPOT_ACCESS_KEY,
      numberOfApiCallRetries: parseInt(process.env.RETRY_TIMES),
    });
  }

  public async syncWithHubSpot(
    type: "DEAL" | "CONTACT",
    pipedriveData: PipeDriveDeal | PipeDriveContact
  ): Promise<void> {
    try {
      this.logger.log("[Pipedrive] Syncing data to Hubspot");
      this.logger.log("Transforming Pipedrive data for HubSpot");

      if (type === "CONTACT") {
        const transformedContactData = this.mapContact(
          pipedriveData as PipeDriveContact
        );
        this.logger.log("Sending contact data to HubSpot");
        await this.createContact(transformedContactData);
      } else {
        const transformedDealData = this.mapDeal(
          pipedriveData as PipeDriveDeal
        );
        this.logger.log("Sending deal data to HubSpot");
        await this.createDeal(transformedDealData);
      }

      this.logger.log("Pipedrive data synced with HubSpot successfully");
    } catch (error) {
      this.logger.error("Error syncing Pipedrive data with HubSpot", error);
      throw new CustomError(
        "[Pipedrive] Failed syncing Pipedrive data with HubSpot",
        500,
        error
      );
    }
  }

  private mapContact(pipedriveData: PipeDriveContact): any {
    try {
      return {
        properties: {
          company: pipedriveData.organisation,
          email: pipedriveData.email,
          firstname: pipedriveData.name,
          lastname: "",
          phone: "",
          createdate: Date.now(),
          website: "hubspot.com",
          lifecyclestage: "marketingqualifiedlead",
        },
      };
    } catch (error) {
      throw new CustomError(
        "[Pipedrive] Failed to transform hubspot data - Contact",
        500,
        error
      );
    }
  }

  private mapDeal(pipedriveData: PipeDriveDeal): any {
    try {
      return {
        properties: {
          amount: pipedriveData.value,
          closedate: this.epochToISOString(pipedriveData.expectedCloseDate),
          dealname: pipedriveData.title,
          pipeline: "default",
          dealstage: pipedriveData.status,
        },
      };
    } catch (error) {
      throw new CustomError(
        "[Pipedrive] Failed to transform hubspot data - Deal",
        500,
        error
      );
    }
  }

  private async createContact(data: any): Promise<void> {
    try {
      await this.hubspotClient.crm.contacts.basicApi.create(data);
    } catch (error) {
      throw new CustomError(
        "[Pipedrive] Failed to create contact in Hubspot",
        501,
        error
      );
    }
  }
  private async createDeal(data: any): Promise<void> {
    try {
      await this.hubspotClient.crm.deals.basicApi.create(data);
    } catch (error) {
      throw new CustomError(
        "[Pipedrive] Failed to create deal in Hubspot",
        501,
        error
      );
    }
  }

  private epochToISOString(epochString: Date) {
    const date = new Date(epochString);
    return date.toISOString();
  }
}
