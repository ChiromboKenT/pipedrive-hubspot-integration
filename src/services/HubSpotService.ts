// HubSpotService.ts
import "reflect-metadata";
import {injectable, inject} from "inversify";
import axios from "axios";
import TYPES from "../types";
import {Logger} from "../middlewares/Logger";

@injectable()
export class HubSpotService {
  private readonly hubSpotApiUrl = process.env.HUBSPOT_URL;

  constructor(@inject(TYPES.Logger) private logger: Logger) {}

  public async syncWithPipedrive(pipedriveData: any): Promise<void> {
    try {
      this.logger.log("Fetching data from HubSpot");

      const hubSpotData = await this.fetchData();

      this.logger.log("Transforming HubSpot data for Pipedrive");

      const transformedData = this.transformDataForPipedrive(
        hubSpotData,
        pipedriveData
      );

      this.logger.log("Sending data to Pipedrive");

      await this.updateData(transformedData);

      this.logger.log("HubSpot data synced with Pipedrive successfully");
    } catch (error) {
      this.logger.error("Error syncing HubSpot data with Pipedrive", error);
      throw error;
    }
  }

  private async fetchData(): Promise<any> {
    try {
      const response = await axios.get(`${this.hubSpotApiUrl}/contacts`);
      return response.data;
    } catch (error) {
      this.logger.error("Error fetching data from HubSpot", error);
      throw error;
    }
  }

  private transformDataForPipedrive(hubSpotData: any, pipedriveData: any): any {
    // Implement logic to transform and merge HubSpot data with Pipedrive data
    // Here, you can compare, merge, or update data as per the business requirements
    // Return the transformed data
  }

  private async updateData(data: any): Promise<void> {
    try {
      // Implement logic to update data in Pipedrive
      // This could involve making API requests to Pipedrive to update the data
    } catch (error) {
      this.logger.error("Error updating data in Pipedrive", error);
      throw error;
    }
  }
}
