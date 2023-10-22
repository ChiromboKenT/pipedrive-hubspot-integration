// PipedriveService.ts
import "reflect-metadata";
import {injectable, inject} from "inversify";
import axios from "axios";
import TYPES from "types";
import { Logger } from "middlewares/Logger";

@injectable()
export class PipedriveService {
  private readonly pipedriveApiUrl = process.env.PIPEDRIVE_URL;

  constructor(@inject(TYPES.Logger) private logger: Logger) {}

  public async syncWithHubSpot(hubSpotData: any): Promise<void> {
    try {
      this.logger.log("Fetching data from Pipedrive");

      const pipedriveData = await this.fetchData();

      this.logger.log("Transforming Pipedrive data for HubSpot");

      const transformedData = this.transformDataForHubSpot(
        pipedriveData,
        hubSpotData
      );

      this.logger.log("Sending data to HubSpot");

      await this.updateData(transformedData);

      this.logger.log("Pipedrive data synced with HubSpot successfully");
    } catch (error) {
      this.logger.error("Error syncing Pipedrive data with HubSpot", error);
      throw error;
    }
  }

  private async fetchData(): Promise<any> {
    try {
      const response = await axios.get(`${this.pipedriveApiUrl}/deals`);
      return response.data;
    } catch (error) {
      this.logger.error("Error fetching data from Pipedrive", error);
      throw error;
    }
  }

  private transformDataForHubSpot(pipedriveData: any, hubSpotData: any): any {
    // Implement logic to transform and merge Pipedrive data with HubSpot data
    // Here, you can compare, merge, or update data as per the business requirements
    // Return the transformed data
  }

  private async updateData(data: any): Promise<void> {
    try {
      // Implement logic to update data in HubSpot
      // This could involve making API requests to HubSpot to update the data
    } catch (error) {
      this.logger.error("Error updating data in HubSpot", error);
      throw error;
    }
  }
}
